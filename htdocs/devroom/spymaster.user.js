// ==UserScript==
// @namespace    com.esydur.spymaster
// @name         SpyMaster Bot
// @version      0.3.16
// @description  Basic SpyMaster bot.
// @license      GPLv3
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require      http://annah.ru/skynet/com.esyfur.prototype.js
// @require      http://annah.ru/skynet/com.esyfur.toolkit.js
// @require      http://annah.ru/skynet/com.esyfur.gm.js
// @include      http://playspymaster.com/tasks
// @include      http://www.playspymaster.com/tasks
// @author       Eugene Janusov <esycat@gmail.com> http://annah.ru/
// ==/UserScript==


/**
 * SpyMaster
 */
com.esyfur.SpyMaster = function() {
	this.version = '0.3.15';

	this.toolkit = com.esyfur.gm;

	this.turnLength = 5;
	this.delay = 60 * this.turnLength / 2;

	this.window = window;
	this.document = unsafeWindow.document; // this.window.document;

	this.toolkit.log("SpyMaster bot has been initialized (version %s).", this.version);
};

com.esyfur.SpyMaster.prototype.getRandomDelay = function() {
	return Math.round(this.delay * Math.random() * 1000);
};

com.esyfur.SpyMaster.prototype.play = function() {
	var self = this;
	var delay = this.getRandomDelay();

	window.setTimeout(
		function() { self.playTasks(); },
		delay
	);

	this.toolkit.info("Next run will be in %i seconds.", Math.round(delay / 1000));
};

com.esyfur.SpyMaster.prototype.checkHealth = function() {
	return !$('#mini-dashboard-health .value').is('.urgent');
};

com.esyfur.SpyMaster.prototype.checkEnergy = function() {
	return !$('#mini-dashboard-energy .value').is('.urgent');
};

com.esyfur.SpyMaster.prototype.initTasks = function() {
	if (this.tasks) return true;

	this.tasks = {};
	this.tasks.list = $('ul.task-list', this.document).children('li');
};

com.esyfur.SpyMaster.prototype.playTasks = function() {
	try {
		this.initTasks();

		// Check environment
		if ($('#repeat-task-disabled').length || $('.cancel-task-button').is(':visible')) {
			throw new Error("Task execution is disabled. Reload.");
		}

		// Check health
		if (!this.checkHealth()) {
			throw new com.esyfur.SpyMaster.Exception("Health is too low. Pass.");
		}

		// Check energy
		if (!this.checkEnergy()) {
			throw new com.esyfur.SpyMaster.Exception("Energy is too low. Pass.");
		}

		var activeTasks = $(this.tasks.list).filter(com.esyfur.SpyMaster.Task.checkRequirements);

		if (activeTasks.length == 0) {
			throw new com.esyfur.SpyMaster.Exception("There are no available tasks. Pass.");
		}

		var index = Math.floor(Math.random() * activeTasks.length);
		var task = new com.esyfur.SpyMaster.Task($(activeTasks).eq(index));
		task.perform();

	}
	catch (e if e instanceof com.esyfur.SpyMaster.Exception) {
		this.toolkit.warn(e.message);
	}
	catch (e if e instanceof Error) {
		this.toolkit.warn(e.message);
		document.location.reload();
	}
	finally {
		this.play();
	}
};


/**
 * SpyMaster Task
 */
com.esyfur.SpyMaster.Task = function(el) {
	this.toolkit = com.esyfur.gm;
	this.element = el;

	this.name = this.getName();
	this.requirements = this.getRequirements();
}

com.esyfur.SpyMaster.Task.prototype.getName = function() {
	return $(this.element).find('dt').text();
};

com.esyfur.SpyMaster.Task.prototype.getRequirements = function() {
	return $(this.element).find('.requirements > ul');
};

com.esyfur.SpyMaster.Task.prototype.checkEnergy = function() {
	return !$(this.requirements).children('.energy-used').find('.negative').length;
};

com.esyfur.SpyMaster.Task.prototype.checkSpymasters = function() {
	return !$(this.requirements).children('.spymasters').find('.negative').length;
};

com.esyfur.SpyMaster.Task.prototype.checkItems = function() {
	return !$(this.requirements).children('.required-items').find('.negative').length;
};

com.esyfur.SpyMaster.Task.prototype.perform = function() {
	unsafeWindow.$(this.element).find('a.perform-task-button:visible').click();
	this.toolkit.log("%s has been performed.", this.name);
};

/**
 * @static
 * @param int index
 * @return boolean
 */
com.esyfur.SpyMaster.Task.checkRequirements = function(index) {
	var requirements = $(this).find('.requirements');
	var failed = $(requirements).find('.spymasters .negative, .required-items .negative').length;
	return failed ? false : true;
};



/**
 * Swith banking
 */
com.esyfur.SpyMaster.SwissBank = {};
com.esyfur.SpyMaster.SwissBank.deposit = function(amount) {};
com.esyfur.SpyMaster.SwissBank.withdraw = function(amount) {};


/**
 * SpyMaster Exception
 */
com.esyfur.SpyMaster.Exception = function(message) {
	this.name = "SpyMasterException";
	this.message = message;
};



// ---
var spymaster = new com.esyfur.SpyMaster();
spymaster.play();

