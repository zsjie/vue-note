Object
===

## Using Object As Map

直接使用一个空对象 `{}` 来做 mapping 是比较常见的做法，不过这种做法可能会有一些问题。

参考：http://www.2ality.com/2013/10/dict-pattern.html

### 属性继承

如果 mapping 中有 key 和 Object.prototype 的属性同名：

```
var obj = {}
obj.toString // should undefined
> [Function Object] 
```

这会使得我们不能使用 key 或者用 `in` 操作符来获取 obj 中的值

### Map entries override methods

如果 mapping 中有 key 和 Object.prototype 的属性同名：

```
var obj = Object.create({
    hasOwnProperty: 123 // 覆盖了 obj.prototype.hasOwnProperty
})

obj.hasOwnProperty(key) 
> Property hasOwnProperty is not a function
```


