me.esycat.gm = {};

me.esycat.gm.getConsole = function() {
	return (unsafeWindow.console) ? unsafeWindow.console : me.esycat.toolkit.fakeConsole;
};

me.esycat.gm.consoleMethod = function consoleMethod(fn) {
	var console = this.getConsole();
	var args = Array.prototype.slice.call(arguments, 1);
	return console[fn].apply(console, args);
};

me.esycat.gm.log  = me.esycat.gm.consoleMethod.curry('log');
me.esycat.gm.info = me.esycat.gm.consoleMethod.curry('info');
me.esycat.gm.warn = me.esycat.gm.consoleMethod.curry('warn');

