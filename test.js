var o = {},
    str = 'message.from.name'

set(o, str, 'bruce')

function set(obj, key, val) {
  debugger
  var path = key.split('.'),
      d = -1,
      l = path.length

  while (++d < l) {
    obj[path[d]] = {}
    obj = obj[path[d]]
  }
  obj[path[d]] = val
}
