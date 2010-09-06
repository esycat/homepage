// ==UserScript==
// @namespace    com.esyfur.google
// @name         Google Translation Hooks by esycat
// @version      0.0.6
// @description  Disables phonetical auto-translation.
// @author       Eugene Janusov <esycat@gmail.com> http://annah.ru/
// @license      GPLv3
// @match        http://translate.google.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js
// ==/UserScript==

document.getElementById('t13nimg').checked = false;

