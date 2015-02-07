// ==UserScript==
// @name        Bandcamp Weekly Scrobbler
// @namespace   http://userscripts.org/users/useridnumber
// @description Scrobble Bandcamp weekly tracks to last.fm
// @require     http://justan.github.io/gmscrobber/simple_scrobbler_user.js
// @require 	http://code.jquery.com/jquery-1.11.2.min.js
// @include     *bandcamp.com/?show=*
// @include     *bandcamp.com/?token=*
// @include     *bandcamp.com/
// @version     0.1
// @updateURL 	https://openuserjs.org/install/rekhubs/Bandcamp_Weekly_Scrobbler.user.js
// @downloadURL	https://openuserjs.org/install/rekhubs/Bandcamp_Weekly_Scrobbler.user.js
// @grant 		GM_getValue
// @grant 		GM_setValue
// @grant 		GM_deleteValue
// @grant 		GM_xmlhttpRequest
// @grant 		GM_registerMenuCommand
// @grant 		unsafeWindow
// ==/UserScript==

console.log("hellooooooooooooooo");


console.log($);
console.log($().jquery);


// get track list
var list = document.getElementsByClassName("bcweekly-track-list unstyled")[0];
var listEndIndex = list.lastElementChild.getAttribute("data-index");
console.log("list end index:", listEndIndex);


// init
var init = function() {
	console.log('init func................');
}


// new scrobbler
var scrob = new Scrobbler({
	name: 'Bandcamp Weekly GM scrobbler',
	ready: init,
	type: 1
});


// get song info
var getSongInfo = function() {
	var song = {};

	song.title = $('.bcweekly-track-item.bcweekly-track-item-large, .bcweekly-track-item.has-merch.bcweekly-track-item-large').find('span.track-name').text();
	//    console.log( 'track name: ' + song.title  );
	song.album = $('.bcweekly-track-item.bcweekly-track-item-large, .bcweekly-track-item.has-merch.bcweekly-track-item-large').find('span.album-name').text();
	//    console.log('album: ' + song.album   );
	song.artist = $('.bcweekly-track-item.bcweekly-track-item-large, .bcweekly-track-item.has-merch.bcweekly-track-item-large').find('.artist-name').text().replace(/\s*by (.*)\s+/g, '$1');
	//    console.log('artist: ' + song.artist  );
	song.index = $('.bcweekly-track-item.bcweekly-track-item-large, .bcweekly-track-item.has-merch.bcweekly-track-item-large').find('.cell.col4.track-number-cell').text();
	//    console.log('list index:', song.index  );

	return song;
};



var INDEX_LAST_TIME_CHECKING = -1;

var CURRENT_CANDIDATE = {};
CURRENT_CANDIDATE.startTime = new Date().getTime();
CURRENT_CANDIDATE.playTime = 0;
CURRENT_CANDIDATE.index = -1;
CURRENT_CANDIDATE.isScrobbled = false;

var checkPlayingTrack = function() {
	console.log('checkPlayingTrack func................');
	var playingTrack = document.getElementsByClassName("bcweekly-track-item bcweekly-track-item-large")[0] || document.getElementsByClassName("bcweekly-track-item has-merch bcweekly-track-item-large")[0];

	if (playingTrack) {
		console.log('yes, there is a playing track!');

		//        $('body').css("background-color", "red");
		//        $('.bcweekly-track-item.bcweekly-track-item-large, .bcweekly-track-item.has-merch.bcweekly-track-item-large').css("background-color", "green");

		// $('.bcweekly-track-item.bcweekly-track-item-large, .bcweekly-track-item.has-merch.bcweekly-track-item-large').find('span.wishlist-msg.collection-btn').prepend('<span class="last-fm-love" >☆last.fm★</span>');

		// get song info
		var song = getSongInfo();
		console.log(song);


		// send now playing request to last.fm
		scrob.nowPlaying(song)


		// if a song plays 30+s, scrobble it
		if (song.index != INDEX_LAST_TIME_CHECKING) {
			// reset current candidate
			console.log('=======================> Playing another track: ' + song.title);
			CURRENT_CANDIDATE.index = song.index;
			CURRENT_CANDIDATE.startTime = new Date().getTime();
			CURRENT_CANDIDATE.playTime = 0;
			CURRENT_CANDIDATE.isScrobbled = false;

			// reset last.fm love track listener 
			$('.currently-playing.large-only').html('<input type="checkbox">Love to last.fm</input>');
			$('.currently-playing.large-only').unbind('click');
			$('.currently-playing.large-only').bind('click', function(event) {
				console.log("############## Sending love track request: " + song.title);
				scrob.love(song);
			});

		}

		// check time and status to scrobble a track
		var now = new Date().getTime();
		CURRENT_CANDIDATE.playTime = now - CURRENT_CANDIDATE.startTime;
		if (CURRENT_CANDIDATE.playTime > 30 * 1000 && CURRENT_CANDIDATE.isScrobbled == false) {
			console.log('=======================> Sending scrobble request: ' + song.title + '....');
			scrob.scrobble(song);
			CURRENT_CANDIDATE.isScrobbled = true;
		}
		console.log(CURRENT_CANDIDATE);

		// set last index
		INDEX_LAST_TIME_CHECKING = song.index;
	}

};

setInterval(checkPlayingTrack, 3000);
