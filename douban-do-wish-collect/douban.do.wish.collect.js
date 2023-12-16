// ==UserScript==
// @name         Douban do, wish, collect
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  shortcut to your books, music and films
// @author       rek
// @match        https://*.douban.com/*
// @icon         https://img9.doubanio.com/favicon.ico
// @grant        none
// ==/UserScript==


// todo 
// * proper and easier way to input html
// * tidy up
// * deactivate clicking on anywhere else
// * show recent items hovering on block/link
// * colors/images/icons/etc to differentiate 
// * tiny info or some other block/link at bottom

// douban is using jquery 1.11.0.min.js hosted on their cdn, @requiring external jquery cause problem
// e.g. rate and comment box won't pop up
// https://img9.doubanio.com/f/music/b66ed708717bf0b4a005a4d0113af8843ef3b8ff/js/music/lib/jquery-1.11.0.min.js
// http://code.jquery.com/jquery-3.4.1.min.js
// @require      http://code.jquery.com/jquery-1.11.0.min.js


(function () {
    'use strict';

    // Your code here...
    if (window.top != window.self) { //-- Don't run on frames or iframes
        return;
    }

    const NAV_ID = 'db-global-nav';
    const ACTIVE_CLASS = "more-active";
    const BLOCK_ID = 'do-wish-collect';
    // const music_do = 'https://music.douban.com/mine?status=do'

    // console.log($);
    console.log('jquery info', $().jquery);

    //    const navEle = $(`#${NAV_ID} .top-nav-info`);
    const navEle = $('#db-global-nav .top-nav-info ul li:first-child');
    // console.log('i found nav ele:', navEle);
    // 👩‍🎤👨‍🎤🎤🎧🎼🎹🥁🪘🎷🎺🎸🪕🎻🪗💽💿📻
    // 🎬📹🎥📽️🎞️🎭🎫🎟️
    // 📑📕📗📘📙📚📖🔖📓
    // 🧚🔖

    let block = `<li id="${BLOCK_ID}">
        <div id="menu-do-wish-collect" style="padding: 0 10px">在想过...🔖</div>
        <div class="more-items">
            <div style="font-size:14px; margin: 0 15px">🪗🥁🎸</div>
            <a href="https://music.douban.com/mine?status=do">在听</a>
            <a href="https://music.douban.com/mine?status=wish">想听</a>
            <a href="https://music.douban.com/mine?status=collect">听过</a>
            
            <div style="font-size:14px; margin: 0 15px">🎞️🎬🎥</div>
            <a href="https://movie.douban.com/mine?status=do">在看</a>
            <a href="https://movie.douban.com/mine?status=wish">想看</a>
            <a href="https://movie.douban.com/mine?status=collect">看过</a>

            <div style="font-size:14px; margin: 0 15px">📕📗📘</div>
            <a href="https://book.douban.com/mine?status=do">在读</a>
            <a href="https://book.douban.com/mine?status=wish">想读</a>
            <a href="https://book.douban.com/mine?status=collect">读过</a>

        </div>
    </li>`

    navEle.after(block);
    $('#menu-do-wish-collect').css('cursor', 'pointer');

    $(window).click(function (e) {
        if ($(e.target).is(`#${BLOCK_ID}`) || $(e.target).parents(`#${BLOCK_ID}`).length > 0) {
            // console.log('yessssssss - has target ancestor');
            if (!$(`#${BLOCK_ID}`).hasClass(ACTIVE_CLASS)) {
                $(`#${BLOCK_ID}`).addClass(ACTIVE_CLASS);
            }
        } else {
            $(`#${BLOCK_ID}`).removeClass(ACTIVE_CLASS);
        }
    })

})();