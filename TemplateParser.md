TemplateParser
===

what does templateParser do?

Parses a template string or node and normalizes it into a node that can be used as partial of a template option

Possible values include:
- id selector: '#some-template-id'
- template string: '<div><span>my template</span></div>'
- DocumentFragment object
- Node object of type Template

```
function templateParser (template) {
    var templateNode

    if (template instanceof window.DocumentFragment) {
        // if template is already a document fragment, do nothing
        return template
    }

    if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
            templateNode = document.getElementById(template.slice(1))
            if (!templateNode) return
        } else {
            return fragment(template)
        }
    } else if (template.nodeType) {
        return fragment(template)
    } else {
        return
    }

    // if it's a template tag and the browser supports it,
    // its content is already a document fragment object
    if (templateNode.tagName === 'TEMPLATE' && templateNode.content) {
        return templateNode.content
    }

    if (templateNode.tagName === 'SCRIPT') {
        return fragment(templateNode.innerHTML)
    }

    return fragment(templateNode.outerHTML)
}

function fragment (templateString) {
    var TAG_RE = /<([\w:]+)/,
        frag = document.createDocumentFragment()

    var tag = TAG_RE.exec(templateString)[1]

    // text only 
    if (!m) {
        frag.appendChild(document.createTextNode(templateString))
        return grag
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
    if (node.firstChild === node.lastChild) {
        frag.appendChild(node.firstChild)
        return frag
    }

    // multi node
    var child
    while (child = node.firstChild) {
        frag.appendChild(child)
    }
    return frag
}
```
