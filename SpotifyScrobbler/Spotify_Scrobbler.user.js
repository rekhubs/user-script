// ==UserScript==
// @name        Spotify Scrobbler
// @namespace   https://openuserjs.org/users/rekhubs
// @description Scrobbler Spotify last.fm
// @include     *play.spotify.com/*
// @require     http://justan.github.io/gmscrobber/simple_scrobbler_user.js
// @updateURL 	https://openuserjs.org/install/rekhubs/Spotify_Scrobbler.user.js
// @downloadURL	https://openuserjs.org/install/rekhubs/Spotify_Scrobbler.user.js
// @version     0.1
// @grant 		GM_getValue
// @grant 		GM_setValue
// @grant 		GM_deleteValue
// @grant 		GM_xmlhttpRequest
// @grant 		GM_registerMenuCommand 
// ==/UserScript==



console.log("hello");


var init = function(){
	console.log("init function");
	scrob.setSongInfoFN(getSongInfo, {checktime: 3000});
	console.log("!!! logging after setSongInfoFN() is called");

	// adjust playtime
	document.getElementById("controls").addEventListener("click", function(e){
		var oldTime = getSongInfo().playTime;
		setTimeout(function(){
			var newTime = getSongInfo().playTime;
			offset = oldTime - newTime;
			scrob.seek(offset);
		}, 0);
	}, true);

	// add "love" listener
	var loveEle = document.getElementById("track-add");
	loveEle.addEventListener('click', function(e){
		if(loveEle.getAttribute('data-tooltip') == "Save"){
			console.log('--- <3<3<3<3<3 ---> sending love request...');
			scrob.love();
		}else if(loveEle.getAttribute('data-tooltip') == "Remove"){
			scrob.unlove();
		}
	}, false);


};


var scrob = new Scrobbler({
  name: 'Spotify Scrobbler',
  ready: init,
  scrate: 0.6
});

console.log("new scrobbler done");


var getSongInfo = function(){
	console.log("============> checking track info ...");
	var song = {};
	song.title = document.getElementById('track-name').getElementsByTagName('a')[0].innerHTML;
	console.log("title", song.title);
	song.artist = document.getElementById('track-artist').getElementsByTagName('a')[0].innerHTML;
	console.log("artist=", song.artist);
	// console.log("album=", song.album);
	var timeStr = document.getElementById("track-length").innerHTML;
	song.duration = timeParse(timeStr);
	song.duration = Math.floor(song.duration);
	console.log("duration", song.duration);
	var playTime = document.getElementById("track-current").innerHTML;
	song.playTime = timeParse(playTime);
	song.playTime = Math.floor(song.playTime);
	console.log("playTime", song.playTime);
	var percent = song.playTime/song.duration;
	console.log("percent", percent);


	var loveEle = document.getElementById("track-add");
	// console.log('love element outerHTML: ' + loveEle.outerHTML);
	console.log('love element data-tooltip: ' + loveEle.getAttribute('data-tooltip') );

	return song;
};

var timeParse = function(timeStr){
	var ts = timeStr.replace(/-/, '').split(':');
	return ts[0]*60 + ts[1]*1;
};