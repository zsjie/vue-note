function Vue (options) {
	var el = document.querySelector(options.el)

	new Compiler(this, options)
}

function Compiler (vm, options) {
	var compiler = this

	var el = compiler.el = document.querySelector(options.el)

	// set up compiler options
	extend(compiler, options)
	compiler.vm = el.vue_vm = vm
	compiler.bindings = Object.create(null)
	compiler.emitter = new Emitter(vm)

	// VM -------------
	vm.$ = {}
	vm.$el = el
	vm.$options = options
	vm.$compiler = compiler

	// DATA -----------
	
	// setup observer
	// this is necessary for all hooks and data observation events
	compiler.setupObserver()	
	
}

Compiler.prototype.setupObserver = function () {
	var compiler = this,
		bindings = compiler.bindings,
		options = compiler.options,
		observer = compiler.observer = new Emiiter(compiler.vm)

	// a hash to hold event proxies for each root level key
	// so they can be referenced and removed later
	observer.proxies = {}

	function check (key) {
		if (!bindings[key]) {
			compiler.createBinding(key)
		}
	}
}

// simple extend
function extend (obj, ext) {
	for (var key in ext) {
		if (key[key] !== ext[key]) {
			obj[key] = ext[key]
		}
	}

	return obj
}

function Emitter (vm) {

}
