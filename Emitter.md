Emitter
===

Emitter 是 vue 中的事件管理器，是最重要的组件之一。内部代码的解耦，大量框架特性的实现都依赖于该组件。ViewModel.observer 就是 Emitter 的实例。

Emitter 的具体实现可自行阅读代码，其实现并不复杂。以下主要说一下 Emitter 需要注意的特点。

## _ctx 属性

```JavaScript
function Emitter (vm) {
    this._ctx = vm || this
}
```

Emitter 接受一个参数 `vm`，这个参数是一个对象，在执行事件回调函数时，会将回调函数的上下文绑定为该对象：

```JavaScript
EmitterProto.applyEmit = function (event) {
    //...
    
    var callbacks = this._cbs[event], args
    if (callbacks) {
        callbacks = callbacks.slice(0)
        args = [].slice.call(arguments, 1)
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].apply(this._ctx, args) // 在执行事件回调函数时，会将回调函数的上下文绑定为该对象
        }
    }
}
```

## 方法中的 `this`

Emitter 有这几个方法：`on`、`once`、`off`、`emit`、`applyEmit`，这几个方法中的 `this` 都是指向 Emitter 本身，也就是说，Emitter 的实例的这几个方法中的 `this` 指向实例本身，而不是 `_ctx` 属性所指定的上下文。这个特性使得在其他函数中调用这些方法时，要注意绑定正确的上下文：

```JavaScript
def(ViewModelProto, '$dispatch', function () {
    var compiler = this.$compiler,
        emitter = compiler.observer,
        parent = compiler.parent
        
   emitter.applyEmit.apply(emitter, arguments) // 使 applyEmit 方法的上下文为 emitter
   
   if (parent) {
       parent.vm.$dispatch.apply(parent.vm, arguments)
   }
})
```