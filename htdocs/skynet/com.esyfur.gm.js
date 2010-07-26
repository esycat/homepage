net.esycat.gm = {};

net.esycat.gm.getConsole = function() {
	return (unsafeWindow.console) ? unsafeWindow.console : net.esycat.toolkit.fakeConsole;
};

net.esycat.gm.consoleMethod = function consoleMethod(fn) {
	var console = this.getConsole();
	var args = Array.prototype.slice.call(arguments, 1);
	return (console[fn]) ? console[fn].apply(console, args) : null;
};

net.esycat.gm.log  = net.esycat.gm.consoleMethod.curry('log');
net.esycat.gm.info = net.esycat.gm.consoleMethod.curry('info');
net.esycat.gm.warn = net.esycat.gm.consoleMethod.curry('warn');

