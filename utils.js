var utils = exported = {
	/**
	 * Most simple bind
	 * enough for the usecase and faster than native bind
	 */
	bind: function (fn, ctx) {
		return function (arg) {
			return fn.call(ctx, arg)
		}
	},

	/**
	 * used to defer batch updates
	 */
	nextTick: function (cb, context) {
		if (context) {
			setTimeout(utils.bind(cb, context), 0)
		}
		else {
			defer(cb, 0)
		}
	}
}