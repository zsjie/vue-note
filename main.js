var parent = new Vue({
	el: '#parent',

	data: {
		message: 'hello, world'
	},

	events: {
		greet: function (data) {
			console.log(data)
			console.log(this.message)
		}
	}
})

var child = new Vue({
	el: '#child',

	parent: parent,

	methods: {
		greet: function () {
			console.log('clicked')
			this.$dispatch('greet', { name: 'zsj' })
		}
	}
})

new Vue({
	el: '#hell',

	methods: {}
})
