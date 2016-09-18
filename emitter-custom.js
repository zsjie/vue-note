function Emitter(ctx) {
	this._ctx = ctx || this
}

var EmitterProto = Emitter.prototype

EmittreProto.on = function (event, fn) {
	this._cbs = this._cbs || {}
	;(this._cbs[event] = this._cbs[event] || []).push(fn)
	return this
}

EmitterProto.once = function (event, fn) {
	var self = this
	this._cbs = this._cbs || {}

	function on () {
		self.off(event, fn)
		fn.apply(this, arguments) 
	}

	on.fn = fn
	this.on(event, on)
	return this
}

EmitterProto.off = function (event, fn) { 
	// it's not necessary to check every arguments
	this._cbs = this._cbs || {}

	if (!arguments.length) {
		this._cbs = {}
		return this
	}

	// specific event
	var callbacks = this._cbs[event]
	if (!callbacks) return this

	// remove all handlers
	if (arguments.length === 1) {
		delete this._cbs[event]
		return this
	}

	// remove specific handler
	var cb
	for (var i = 0; i < callbacks; i++) {
		cb = callbacks[i]
		if (fn === cb || cb.fn === fn) {
			callbacks.splice(i, 1)
			break
		}
	}
	return this
}

EmitterProto.emit = function (event) {
	this._cbs = this._cbs || {}
	var callbacks = this._cbs[event], args

	if (callbacks) {
		callbacks = callbacks.slice(0)
		args = [].slice.call(arguments, 1)
		for (var i = 0, len = callbacks.length; i < len; i++) {
			callbacks[i].apply(this._ctx, args)
		}
	}

	return this
}

module.exports = Emitter
