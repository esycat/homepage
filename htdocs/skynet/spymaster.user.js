// ==UserScript==
// @name         SpyMaster Bot
// @namespace    me.esycat.spymaster
// @version      0.3.0 2009-06-07
// @description  Basic SpyMaster bot.
// @license      GPLv3
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require      http://annah.ru/skynet/me.esycat.common.js
// @require      http://annah.ru/skynet/me.esycat.toolkit.js
// @require      http://annah.ru/skynet/me.esycat.gm.js
// @include      http://playspymaster.com/tasks
// @include      http://www.playspymaster.com/tasks
// @author       Eugene Janusov <esycat@gmail.com> http://annah.ru/
// ==/UserScript==

/**
 * SpyMaster
 */
me.esycat.SpyMaster = function() {
	this.version = '0.3.1';

	this.toolkit = me.esycat.gm;
	this.delay = 60 * 5 / 2;

	this.window = window;
	this.document = unsafeWindow.document; // this.window.document;

	this.toolkit.log("SpyMaster bot has been initialized (version %s).", this.version);
};

me.esycat.SpyMaster.prototype.getRandomDelay = function() {
	return Math.round(this.delay * Math.random() * 1000);
};

me.esycat.SpyMaster.prototype.play = function() {
	var self = this;
	var delay = this.getRandomDelay();

	window.setTimeout(
		function() { self.playTasks(); },
		delay
	);

	this.toolkit.info("Next run will be in %f milliseconds.", delay);
};

me.esycat.SpyMaster.prototype.deposit = function(amount) {
}

me.esycat.SpyMaster.prototype.withdraw = function(amount) {
}


me.esycat.SpyMaster.prototype.initTasks = function() {
	if (this.tasks) return true;

	this.tasks = {};
	this.tasks.list = $('ul.task-list', this.document).children('li');
	this.tasks.subset = 1;
};

me.esycat.SpyMaster.prototype.playTasks = function() {
	try {
		this.initTasks();

		if ($('#repeat-task-disabled').length || $('.cancel-task-button').is(':visible')) {
			this.toolkit.warn("Task execution is disabled. Reload.");
			document.location.reload();
		}
		else if ($('#mini-dashboard-health .value').is('.urgent')) {
			this.toolkit.warn("Health is too low. Pass.");
		}
		else if ($('#mini-dashboard-energy .value').is('.urgent')) {
			this.toolkit.warn("Energy is too low. Pass.");
		}
		else {
			var activeTasks = $(this.tasks.list).filter(me.esycat.SpyMaster.Task.checkRequirements);

			if (activeTasks.length) {
				var index = Math.floor(Math.random() * this.tasks.subset) + (activeTasks.length - this.tasks.subset);
				unsafeWindow.$(activeTasks).eq(index).find('a.perform-task-button').click();

				this.toolkit.log("Task #%i has been executed.", (index + 1));
			}
			else {
				this.toolkit.warn("There is no active tasks. Pass.");
			}
		}

		this.play();
	}
	catch (e) {
		alert(e);
	}
};


/**
 * SpyMaster Task
 */
me.esycat.SpyMaster.Task = function(el) {
	this.element = el;
};

me.esycat.SpyMaster.Task.prototype.perform = function(index) {};

/**
 * @static
 * @param int index
 * @return boolean
 */
me.esycat.SpyMaster.Task.checkRequirements = function(index) {
	var requirements = $(this).find('.requirements');
	var failed = $(requirements).find('.spymasters .negative, .required-items .negative').length;
	return failed ? false : true;
};



// ---
var spymaster = new me.esycat.SpyMaster();
spymaster.play();

