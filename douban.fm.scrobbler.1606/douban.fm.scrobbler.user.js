// ==UserScript==
// @name         douban fm scrobbler
// @namespace    douban.com/people/rek
// @version      0.1
// @description  douban fm scrobbler (160717)
// @require 	http://code.jquery.com/jquery-1.11.2.min.js
// @require     http://justan.github.io/gmscrobber/simple_scrobbler_user.js
// @author       rek
// @match        *douban.fm/*
// @grant 		GM_getValue
// @grant 		GM_setValue
// @grant 		GM_deleteValue
// @grant 		GM_xmlhttpRequest
// @grant 		GM_registerMenuCommand
// @grant 		unsafeWindow
// ==/UserScript==

// todo: love


console.log("hello!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

console.log($);
console.log($().jquery);

var init = function(){
    console.log('get into init func');
    scrob.setSongInfoFN(getSongInfo, {checktime: 3000});
    console.log('setSongInfoFN() called');

    // love button
    var loveEle = $('svg.icon-heart')[0];
    var loveEleClr = $(loveEle).find('g path').attr('fill');
    console.log('love element color:', loveEleClr);
    loveEle.addEventListener('click', function(e){
        if(   loveEleClr == '#4A4A4A'   ){
            scrob.unlove();
            console.log('    --> triggered [unlove]');
        } else if ( loveEleClr == '#FF2C56' ) {
            scrob.love();
            console.log('    --> triggered [love]');
        }
    }, false);

};


var scrob = new Scrobbler( {
    name: 'douban fm scrobbler',
    ready: init,
    scrate: 0.6
});
console.log('new scrobbler ready');

var getSongInfo = function(){
    console.log("i'm in check func");
    console.log("jquery info: ", $().jquery  );
    var testObj = $('div.titles:has(.title)')[1];
    //console.log("test --> ", testObj);
    var title = testObj;


    var titlesInTitles = $('div.titles > div.title');
    //console.log("\n", "titles in titles --> ", titlesInTitles);
    mainTitle = titlesInTitles[1];

    title = $( mainTitle ).find('a').attr('title');
    console.log("title --> ", title);
    artist = $('div.titles > div.subtitle').find('a').attr('title');
    console.log("artist --> ", artist);

    var progress =   $(  $('.fullplayer-progress > div')[1]  ).attr('style').replace('left: ', '').replace(/[;%]/g, '');
    var percent = parseFloat( progress );
    //var progress = $(  fullPlayerProgress  ).find('div');
    console.log("player progress --> ", progress);
    console.log("player progress precent --> ", percent);

    var timeLeft = $('div.titles > div.subtitle').find('span.time')[0].innerHTML.replace('-', '');
    console.log("time left -->", timeLeft );

    var minute = parseInt( timeLeft.replace(/:[0-9]+/g, '') );
    var second =  parseInt( timeLeft.replace(/[0-9]+:/g, '') );

    console.log('minute & second:', minute, second);
    songTime = Math.floor(    (minute * 60 + second)/(1-percent/100)   );
    playTime = songTime * percent/100;
    console.log('song time in second:', songTime);


    song = {};
    song.title = title;
    song.artist = artist;
    song.duration = playTime;
    console.log('song obj:', song);

    return song;
};

//setInterval(check, 3000);
