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
function templateParser (template) {
    var templateNode
    
    // if template is already document fragment, do nothing
    if (template instanceof window.DocumentFragment) {
        return template
    }

    if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
            templateNode = document.getElementById(template.slice(1))
            if (!templateNode) return
        }
    } else if (template.nodeType) {
        return fragment(template)
    } else {
        return
    }
    
    // if it's a template tag and the browser supports it,
    // its content is already a document fragment
    if (templateNode.tagName === 'TEMPLATE' &&
        templateNode.content) {
            return templateNode.content
        }

    if (templateNode.tagName === 'SCRIPT') {
        return fragment(template.innerHTML)
    }

    return fragment(templateNode.outerHTML)


}

function fragment (templateString) {
    var tagRe = /<([\w:]+)/

    var frag = document.createDocumentFragment(),
        m = tagRe.exec(templateString)

    // text only
    if (!m) {
        frag.appendChild(document.createTextNode(tempalteString))
        return frag
    }

    var tag = m[1],
        wrap = map[tag] || map._default,
        depth = wrap[0],
        prefix = wrap[1],
        suffix = wrap[2],
        node = document.createElement('div')

    node.innerHTML = prefix + templateString.trim() + suffix
    while (depth--) node = node.lastChild

    // one element
    if ()
}
```


