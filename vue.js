function Vue (options) {
	var vm = this,
		el = document.querySelector(options.el)
	/* global Emitter */
	vm.observer = new Emitter(vm)

	var parent = options.parent
	if (parent) {
		vm.$parent = parent
	}

	// process events property
	var events = options.events
	if (events) {
		for (var event in events) {
			vm.observer.on(event, events[event])
		}
	}

	// process attr
	var clickHandler = el.getAttribute('v-on:click')
	if (clickHandler) {
		el.onclick = function () {
			options.methods[clickHandler].apply(vm, arguments) 
		}
	}
}

var VueProto = Vue.prototype

VueProto.$dispatch = function () {
	var observer = this.observer,
		parent = this.$parent

	observer.applyEmit(arguments)
	if (parent) {
		parent.observer.applyEmit.apply(parent.observer, arguments)
	}
}
