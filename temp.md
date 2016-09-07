temp
===

## compiler

```
function Compiler (vm, options) {
    var compiler = this,
        key, i

    // default state
    compiler.init      = true
    compiler.destroyed = false

    // process and extend options
    options = compiler.options = options || {}
    // what processOptions does:
    // 1. convert component object to constructor
    // 2. parse partials
    // 3. check filter
    // 4. parse template
    utils.processOptions(options)
}
```

## template-parser.js

possible values include:
- id selector
- template string
- DocumentFragment object
- Node object of type Template

if template is already a document fragment, do nothing

## how to parse a template string to Node object

```
while (child = node.firstChild) {
    frag.appendChild(child)
  console.log(frag)
}
```


