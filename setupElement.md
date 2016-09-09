How is the element is set up?
===

```
function setupElement (options) {
    // create the node first 
    var el = typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el || document.createElement(options.tagName || 'div')

    var template = options.template,
        child, replacer, i, attr, attrs

    if (template) {
        
    }
}
```