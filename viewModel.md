ViewModel
===

ViewModel 是最重要的对象，每个 Vue 对象都是 ViewModel 的实例。ViewModel 内部通过 `Compiler` 函数来产生 Vue 对象。

```
function ViewModel (options) {
    if (options === false) return
    new Compiler(this, options)
}
```

## Compiler Function

```
hooks = ['created', 'ready', 'destroy']

function Compiler (vm, options) {
    var compiler = this,
        key, i
    
    // default state
    compiler.init = true
    compiler.destroy = false

    // process and extend options
    options = compiler.options = options || {}
    // what processOptions does:
    // 1. convert component object to ViewModel constructor
    // 2. parse template
    // 3. check filters
    utils.processOptions(options)
}
```



