// ==UserScript==
// @name        Jira Goto "Activity" Column
// @namespace   a
// @include     */jira.*.com/browse/*
// @version     0.1
// @grant       none
// ==/UserScript==

// in floating list: after ul id="opsbar-opsbar-transitions"
// add new button
// Activity div id: id="activitymodule"


console.log('helloooooooooooo');

var transBut = document.getElementById('opsbar-opsbar-transitions');
console.log(transBut);

var toolbar = document.getElementsByClassName('toolbar-split toolbar-split-left')[0];
console.log(toolbar);


//class="toolbar-trigger issueaction-workflow-transition"
// id = activitymodule

var actButton = document.createElement('ul');
actButton.innerHTML = '<li class="toolbar-item">\
	<div class="toolbar-trigger issueaction-workflow-transition">\
	<a  href="#linkingmodule_heading">\
	Goto Activity Column\
	</div></a></li>';
console.log(actButton.innerHTML);
actButton.setAttribute('class', 'toolbar-group pluggable-ops');

toolbar.appendChild(actButton);

