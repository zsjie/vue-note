当你实例化一个 Vue 对象，Vuejs 做了哪些工作？
===

一个双向绑定的例子。

```html
<div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
</div>
```

```javascript
new Vue({
  el: '#app', 
  data: {
    message: 'Hello Vue.js!'
  }
})
```

简单来说，当实例化一个 Vue 对象时，Vue.js 会做以下的事情：

1. 创建 observer，对 data 进行监听，提供订阅某个数据变化的能力，如监听其中的 message 属性；
2. 编译模板，找出其中的指令，如上述例子中的指令为 text 和 model，并得到指令对应的更新视图的方法；
3. 将指令的数据依赖订阅在 observer 上，这样一来，当 data 发生变化，视图也会相应地发生变化。

我们接下来尽可能细致地分析源码，探讨这个例子中的每一个细节。

源码版本：`0.10`

## Vue 构造函数

源码的入口文件是 src/main.js，Vue 构造函数主要定义在 src/viewmodel.js 文件中，src/main.js 又对 ViewModel 做了更多的定义工作，比如说暴露 API，设置基本配置等。完整的 ViewModel 定义工作非常复杂，我们会只摘取和例子相关的代码进行分析。

ViewModel 大概长这个样子：

```javascript
function ViewModel (options) {
  if (options === false) return;
  new Compiler(this, options)
}

ViewModel.options = config.globalAssets = { // config 相当于一个全局配置对象

  // 包含指令及其绑定和更新的方法，是一个非常庞大的对象
  // 稍后会单独进行分析
  directives: {  }  
}

var VMProto = ViewModel.prototype

// 通过 keypath 来获取值
VMProto.$get = function (key) {
  var val = utils.get(this, key)
  return val === undefined && this.$parent
    ? this.$parent.$get(key)
    : val
} 

// 通过 keypath 设置某个属性的值。在 directives 中用到
VMProto.$set = function (key, value) {
  utils.set(this, key, value)
}
```

