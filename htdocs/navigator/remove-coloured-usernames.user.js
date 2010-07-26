// ==UserScript==
// @name         Remove coloured usernames
// @namespace    http://gamenavigator.ru/
// @version      0.1.8 2008-02-15
// @description  Sets default color for all usernames on Game World Navigator Forums.
// @include      http://forums.gamenavigator.ru/*
// @exclude      http://forums.gamenavigator.ru/adm/*
// @author       Eugene Janusov <esycat@gmail.com> http://annah.ru/
// ==/UserScript==

/* For compatibility with Firefox < 3.0 */
if (!document.getElementsByClassName) {
	document.getElementsByClassName = function(searchClass, node, tag) {
		var node = node || document;
		var tag = tag || '*';

		var classElements = new Array();
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\\\s)" + searchClass + "(\\\\s|$)");

		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
}

var allowedColors = [];
//var allowedColors = ['rgb(170, 0, 0)', 'rgb(0, 170, 0)'];

var els = document.getElementsByClassName('username-coloured');

for (var i = 0; i < els.length; i++)
	if (allowedColors.indexOf(els[i].style.color) == -1)
		els[i].style.color = null;

