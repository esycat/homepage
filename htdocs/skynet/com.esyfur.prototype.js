/**
 *
 */
Function.prototype.curry = function() {
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function() {
		return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	};
};


/**
 *
 */
Function.prototype.partial = function() {
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function() {
		alert(arguments.length + ' | ' + arguments[0] + ' | ' + arguments[1]);
		var argc = 0;
		for (var i = 0; i < args.length && argc < arguments.length; i++)
			if (args[i] === undefined)
				args[i] = arguments[argc++];
		return fn.apply(this, args);
	};
};


/**
 * Object inheritance
 *
 * @param parent -- Function or Object
 */
Function.prototype.inherit = function(parent) {
	if (parent.constructor == Function) { // Normal inheritance
		this.prototype = new parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent.prototype;
	}
	else { // Pure virtual inheritance
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent;
	}

	return this;
}


/**
 * @see http://ejohn.org/blog/javascript-array-remove/
 */
Array.prototype.remove = function(from, to) {
	this.splice(from, !to || 1 + to - from + (!(to < 0 ^ from >= 0) && (to < 0 || -1) * this.length));
	return this.length;
};
