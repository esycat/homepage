// ==UserScript==
// @name         SpyMaster Bot
// @namespace    net.esycat.spymaster
// @version      0.3.15 2009-07-12
// @description  Basic SpyMaster bot.
// @license      GPLv3
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require      http://annah.ru/skynet/net.esycat.prototype.js
// @require      http://annah.ru/skynet/net.esycat.toolkit.js
// @require      http://annah.ru/skynet/net.esycat.gm.js
// @include      http://playspymaster.com/tasks
// @include      http://www.playspymaster.com/tasks
// @author       Eugene Janusov <esycat@gmail.com> http://annah.ru/
// ==/UserScript==


/**
 * SpyMaster
 */
net.esycat.SpyMaster = function() {
	this.version = '0.3.15';

	this.toolkit = net.esycat.gm;

	this.turnLength = 5;
	this.delay = 60 * this.turnLength / 2;

	this.window = window;
	this.document = unsafeWindow.document; // this.window.document;

	this.toolkit.log("SpyMaster bot has been initialized (version %s).", this.version);
};

net.esycat.SpyMaster.prototype.getRandomDelay = function() {
	return Math.round(this.delay * Math.random() * 1000);
};

net.esycat.SpyMaster.prototype.play = function() {
	var self = this;
	var delay = this.getRandomDelay();

	window.setTimeout(
		function() { self.playTasks(); },
		delay
	);

	this.toolkit.info("Next run will be in %i seconds.", Math.round(delay / 1000));
};

net.esycat.SpyMaster.prototype.checkHealth = function() {
	return !$('#mini-dashboard-health .value').is('.urgent');
};

net.esycat.SpyMaster.prototype.checkEnergy = function() {
	return !$('#mini-dashboard-energy .value').is('.urgent');
};

net.esycat.SpyMaster.prototype.initTasks = function() {
	if (this.tasks) return true;

	this.tasks = {};
	this.tasks.list = $('ul.task-list', this.document).children('li');
};

net.esycat.SpyMaster.prototype.playTasks = function() {
	try {
		this.initTasks();

		// Check environment
		if ($('#repeat-task-disabled').length || $('.cancel-task-button').is(':visible')) {
			throw new Error("Task execution is disabled. Reload.");
		}

		// Check health
		if (!this.checkHealth()) {
			throw new net.esycat.SpyMaster.Exception("Health is too low. Pass.");
		}

		// Check energy
		if (!this.checkEnergy()) {
			throw new net.esycat.SpyMaster.Exception("Energy is too low. Pass.");
		}

		var activeTasks = $(this.tasks.list).filter(net.esycat.SpyMaster.Task.checkRequirements);

		if (activeTasks.length == 0) {
			throw new net.esycat.SpyMaster.Exception("There are no available tasks. Pass.");
		}

		var index = Math.floor(Math.random() * activeTasks.length);
		var task = new net.esycat.SpyMaster.Task($(activeTasks).eq(index));
		task.perform();

	}
	catch (e if e instanceof net.esycat.SpyMaster.Exception) {
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
net.esycat.SpyMaster.Task = function(el) {
	this.toolkit = net.esycat.gm;
	this.element = el;

	this.name = this.getName();
	this.requirements = this.getRequirements();
}

net.esycat.SpyMaster.Task.prototype.getName = function() {
	return $(this.element).find('dt').text();
};

net.esycat.SpyMaster.Task.prototype.getRequirements = function() {
	return $(this.element).find('.requirements > ul');
};

net.esycat.SpyMaster.Task.prototype.checkEnergy = function() {
	return !$(this.requirements).children('.energy-used').find('.negative').length;
};

net.esycat.SpyMaster.Task.prototype.checkSpymasters = function() {
	return !$(this.requirements).children('.spymasters').find('.negative').length;
};

net.esycat.SpyMaster.Task.prototype.checkItems = function() {
	return !$(this.requirements).children('.required-items').find('.negative').length;
};

net.esycat.SpyMaster.Task.prototype.perform = function() {
	unsafeWindow.$(this.element).find('a.perform-task-button:visible').click();
	this.toolkit.log("%s has been performed.", this.name);
};

/**
 * @static
 * @param int index
 * @return boolean
 */
net.esycat.SpyMaster.Task.checkRequirements = function(index) {
	var requirements = $(this).find('.requirements');
	var failed = $(requirements).find('.spymasters .negative, .required-items .negative').length;
	return failed ? false : true;
};



/**
 * Swith banking
 */
net.esycat.SpyMaster.SwissBank = {};
net.esycat.SpyMaster.SwissBank.deposit = function(amount) {};
net.esycat.SpyMaster.SwissBank.withdraw = function(amount) {};


/**
 * SpyMaster Exception
 */
net.esycat.SpyMaster.Exception = function(message) {
	this.name = "SpyMasterException";
	this.message = message;
};



// ---
var spymaster = new net.esycat.SpyMaster();
spymaster.play();

