Observing Data
===

`Compiler` 的最重要的一项工作是建立起数据监控机制。来看以下伪代码

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
