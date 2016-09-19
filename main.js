var parent = new Vue({
    el: '#parent',

    events: {
        greet: function (data) {
            console.log(data)
        }
    }
})

new Vue({
    el: '#listener',

    parent: parent,

    events: {
        greet: function (data) {
            console.log(data)
        }
    }
})

new Vue({
    el: '#emitter',

    parent: parent,

    methods: {
        greet: function () {
            console.log('click')
            this.$dispatch('greet', { name: 'zsj' })
        }
    }
})
