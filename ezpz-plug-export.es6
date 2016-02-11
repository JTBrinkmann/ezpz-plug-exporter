'use strict'

<!--           ezpz-plug-export           -->
<!--       export your plug.dj data       -->
<!-- no bullshit, just a 1-Click-Download -->

// configure which endpoints get backup'd, and which filenames will be used
const endpoints = {
    'users/me':              'profile.json',
    'friends':               'friends.json',
    'friends/invites':       'invites.json',
    'ignores':               'ignores.json',
    'rooms/favorites':       'favorites.json',
    'rooms/history':         'history.json',
    'rooms/me':              'rooms.json',
    'store/inventory':       'inventory.json',
    'users/me/history':      'history.json',
    'users/me/transactions': 'transactions.json'
}

// set up progress bar
$('#ezpz-progress').remove()
let $prog = $('<div id=ezpz-progress>')
    .css({
        position:   'absolute',
        height:     '100%',
        background: 'rgba(0, 156, 221, .5)',
        zIndex:     -1,
        transition: 'width 200ms ease-in-out, background 200ms linear'
    })
    .appendTo('#footer')

// error handler
const ლ_ಠ益ಠ_ლ= (msg, err) => {
    // show warning in the console
    console.warn(msg, err)

    // add an error message to the chat
    if (window.API && typeof API.chatLog == 'function')
        API.chatLog(`${msg}\xa0\xa0\xa0${err&&err.message || err || ''}`) // \xa0 is &nbsp;

    // temporarily turn the progress bar red/bloodorange
    $prog.css({ background: 'rgba(221, 20, 0, 0.5)' })
    setTimeout(() => {
        // turn it back to blue, unless we're done exporting
        if (loaded != total)
            $prog.css({ background: 'rgba(0, 156, 221, .5)' })
    }, 500)
}

// helper function to load data and store it in the zip
let delay = total = loaded = 0
const λ = (url, filename, folder) => new Promise( (fulfill, reject) => {
    // first, wait a moment before proceeding (0.2 seconds for each resource)
    // my tests indicate the delay isn't even necessary, but better be safe than sorry
    setTimeout(
        // load the requested URL from https://plug.dj/_/… or whatever domain we're on
        () => $.get(`/_/${url}`, null,null, 'text')
            .then(
                data => { // data successfully loaded
                    // add file to zip
                    ;(folder || zip).file(`${filename}`, data)
                    // log progress to console
                    console.log(`[${++loaded}/${total}] loaded /_/${url} (${filename})`)
                    // update progress bar (make it wider)
                    $prog.css({width: `${100*loaded/total}%`})
                },
                // failed to load, show warning
                (_,err) => ლ_ಠ益ಠ_ლ(`failed to load /_/${url} (${filename})`, err)

            ).then(fulfill, fulfill), // we don't reject ever. KEEP IT MOVING! ಠ_ಠ
        200*(delay++) // this specifies how long we're waiting before loading
    )
})

// track how long it takes (the result will be shown in the console, once the exporter is finished)
console.time('playlist export')

// load helper scripts (JSZip to create a ZIP file, FileSaver to download the zip)
let define_ = window.define // fix JSZip not exporting properly
window.define = null
Promise.all([
    Promise.resolve($.getScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js')),
    Promise.resolve($.getScript('https://cdn.rawgit.com/koffsyrup/FileSaver.js/master/FileSaver.js'))
]).then(() => {
    // both JSZip and FileSaver are loaded
    window.define = define_ // restore, now that JSZip is loaded

    // create a ZIP to add the exported files to
    let zip = new JSZip()

    // first only load /_/playlists to see if it even works
    // so we don't spam requests if it doesn't work anyways
    $.getJSON('/_/playlists').then(data => {
        // add playlist-list to ZIP
        zip.file('playlists.json', JSON.stringify(data))
        // `total` is the amount of resources we are loaded, this is necessary for the progressbar to correctly scale
        total = data.data.length + Object.keys(endpoints).length

        // export playlists
        plFolder = zip.folder('playlists')
        promises = data.data.map( pl => λ(`playlists/${pl.id}/media`, `${pl.name}.json`, plFolder) )

        // add other files (see `endpoints` at the very top of this file)
        l = promises.length
        for (url in endpoints)
            promises[l++] = λ(url, endpoints[url])

        // promises is a list of so-called "Promises", one for each resource we are loading
        // the promise will tell us when it's down. We use `Promise.all(promises)`
        // to wait for ALL promises to finish
        Promise.all(promises) .then(() => { // finished loading all resources
            // compile the zip and download it
            let date = /[^T]+/.exec(new Date().toISOString())[0]
            saveAs(zip.generate({ type: 'blob' }), `${date}_plug_playlists.zip`)

            // stop tracking the time (and show how long it took in the console)
            console.timeEnd('playlist export')

            // change the progress bar to green
            $prog.css({ background: 'rgba(0, 221, 78, 0.5)' })

            // after 5 seconds (5000ms), remove the progress bar
            setTimeout(() => $prog.fadeOut(() => $prog.remove()), 5000)
        })

    }, (_,err) => {
        // failed to load /_/playlists, skipping any other requests
        ლ_ಠ益ಠ_ლ('Failed to load playlists data. Are you not logged in? Is plug down?', err)

        // stop tracking the time (and show how long it took in the console)
        console.timeEnd('playlist export')
    })
})
