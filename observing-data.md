Observing Data
===

`Compiler` 的最重要的一项工作是建立起数据监控机制。来看以下伪代码：

```javascript
function Compiler (options) {
  var compiler = this,
    data = options.data
  
  // set up observer
  compiler.setupObserver()
  
  // create binding for computed propterties
  compiler.createBinding(computed)
  
  // create binding for methods
  compiler.createBinding(methods)
  
  compiler.observeData()
}
```

## Set up Observer

compiler 的 observer 实际上是一个 Emitter 实例，它会监听数据的变化，包括 get/set/mutate 事件，同时也会监听组件的生命周期事件，包括 init，ready，destroyed 等。

`compiler.setupObserver` 的工作比较简单，主要是实例化一个 Emitter 并为上述的事件注册回调函数。需要注意的是，实例化 Emitter 时传入的参数是 `compiler.vm`，也就是说，回调函数执行时 `this` 指向的上下文是组件本身，而不是 compiler。具体可参见 Emitter 的实现。

```javascript
CompilerProto.setupObserver = function () {
  var compiler = this,
    bindings = compiler.bindings,
    options = compiler.options,
    observer = compiler.observer = new Emitter(compiler.vm)
    
  // a hash to hold event proxies for each root level key
  // so they can be referenced and removed later
  observer.proxies = {}
  
  // add own listeners which trigger binding updates
  observer
    .on('get', onGet)
    .on('set', onSet)
    .on('mutate', onSet)
    
  // regiester hooks...
  
  function onGet (kek) {
    check(key)
    DepsParser.catcher.emit('get', bindings[key])
  }
  
  function onSet(key, val, mutation) {
    observer.emit('change:' + key, val, mutation)
    check(key)
    bindings[key].update(val)
  }
  
  function check(key) {
    if (!bindings[key]) {
      compiler.createBinding(key)
    }
  }
}
```

## Create Binding

`CompilerProto.createBinding` 建立起 vm 和某个 key 之间的绑定关系，这个绑定关系体现为一个 Binding 实例，每个 key 都有唯一一个对应的 binding，这些 binding 缓存在 compiler.bindings 属性中。

```javascript
new Vue({
  data: {
    key: 'value'
  },
  
  methods: {
    foo: function () {
      console.log(this.key) // value
    }
  }
})
```

如上面的代码所示，methods 中的函数上下文是 vm，`this` 可以直接指向 `data` 中的数据，所以 `data` 中的每个属性都是 root level 的，这样才有可能通过 `this` 来直接获取。binding 中有关于其对应的 key 是否为 root level 的标记。

```javascript
function Binding(compiler, key, isExp, isFn) {
  this.root = !this.isExp && key.indexOf('.') === -1
}
```
