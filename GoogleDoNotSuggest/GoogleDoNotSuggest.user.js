// ==UserScript==
// @name         Google do not suggest
// @namespace    http://tampermonkey.net/
// @version      2024-10-25
// @description  Google do not suggest... Don't show search history
// @author       rek
// @match        https://*.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// @grant        none
// ==/UserScript==

// todo
// * button to show and hide

(function () {
    'use strict';

    // Your code here...
    if (window.top != window.self) { //-- Don't run on frames or iframes
        return;
    }

    console.log('------> hi google history');
    const tempId = 'Alh6id';
    $('#Alh6id').hide();

    // $('#id').hide();
    // $('#id').show();

})();
