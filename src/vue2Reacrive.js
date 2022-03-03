function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
const arrayNativeProto = Array.prototype
const arrayProtoNew = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach((method) => {
  arrayNativeProto[method].apply(this)
  // 1.在这里进行依赖收集
  // 2.对新增数据增加响应式效果
})
function observe(obj) {
  if (!isObject(obj)) {
    return obj
  }
  if (Array.isArray(obj)) {
    /**
     * 对象为数组，处理如下：
     * 对操作数组的方法push,pop,shift,unshift,splice,sort,reverse进行原型改写
     */
    obj.__proto__ = arrayProtoNew
  } else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        defineReactive(obj, key, obj[key])
      }
    }
  }
}
function defineReactive(target, key, value) {
  observe(value)
  Object.defineProperty(target, key, {
    get() {
      console.log(`此处访问了${key}:${value}`)
      return value
    },
    set(val) {
      if (val != value) {
        observe(val)
        updateViews('视图更新喽～～～')
        value = val
      }
    }
  })
}
function updateViews(text) {
  console.log(text)
}

const data = {
  a: 1,
  b: 2,
  color: { red: 1 }
}
observe(data)
console.log(data.color.red)
data.color.red = 100
