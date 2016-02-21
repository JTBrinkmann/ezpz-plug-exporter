# ezpz-plug-export          
export your plug.dj data      
no bullshit, just a 1-Click-Download


## Usage
There are two ways to do this, the easy way (using a bookmarklet), and the idiot-proof ("alternative") way.

### Bookmarklet
select the text below and drag'n'drop it into your bookmarksbar, go to plug.dj, click the bookmarklet, done.
```
javascript:$.getScript('https://rawgit.com/JTBrinkmann/ezpz-plug-exporter/master/ezpz-plug-export.js');void(8)
```

### Alternative Way
1. copy the text form the block above (the one that starts with `javascript:`)
2. go to plug.dj (or a plug.dj testing server)
3. log in (if not already). You can't export your stuff if you aren't logged in!
4. click on the address bar (or "URL bar") at the top of your browser and type `javascript:` (remove everything else in the address bar, if necessary)
5. paste in the text that you copied in Step 1. (e.g. press ctrl+v)
6. Hit enter and lean back


## Reasons to use it
Use this exporter to get a backup **while you can**. Whatever you want to do with the backup later on, you can only do it if you **actually have** a backup!

With the exported data, you can (using other tools):
* import your songs into Youtube
* import your songs into another social music website / plug.dj alternative (see [Dubtrack Playlist Pusher](https://github.com/JTBrinkmann/Dubtrack-Playlist-Pusher))
* check your friendslist from plug.dj and maybe try to contact your friends again
* analyze the data? I dunno whatever


## Issues
### Problem: it opens up a web search
you probably didn't do step 4. >_>

Don't try to be outsmart me and just follow the instructions.

### Problem: security concerns
If you're wondering what this script does, and whether it might be malicious, just take a short moment and just look at the code (click ezpz-plug-exporter.js in the file-list above). It's very well annotated, so you don't need to be a rocket scientist to see that it doesn't do anything stupid. It just loads a list of resources (your user data, room history, etc, etc) and all of your playlists, bundles them in a ZIP and then downloads the ZIP. No bullshit, just a 1-Click-Download.

### It doesn't work on Safari / an old Internet Explorer
You have no-one but yourself to blame, for using these bad browsers. "Safari is bad?" Yes. Yes it is. There's a reason websites like [safari-is-the-new-ie.com](https://www.safari-is-the-new-ie.com/) exist. Safari purposefully doesn't let you download the ZIP that this exporter creates. The Safari developers are aware of this issue, but they don't even want to fix it.

**Just try again using a better browser.**

### plug.dj is currently down, what to do now?
Too bad. If you can't get on any plug.dj testing server either, there's nothing you can do here, sorry.

If you want to get your playlists back without access to plug.dj, you may have luck with the [plug.dj RIP playlist exporter](https://p0ne.com/rip-playlist-exporter/), which tries to restore your playlists from your browsers "cache" (technically it's the localStorage, not the cache), success not guaranteed, though.
