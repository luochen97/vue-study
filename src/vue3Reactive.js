// 工具函数： 判断是否是对象
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
let currentEffectFn = null
// 副作用函数effect
// 1.执行一次函数
// 2.依赖收集
// 异常处理
function effect(fn, ...args) {
  try {
    const effectFn = function (...args) {
      fn(...args)
    }
    currentEffectFn = effectFn
    effectFn()
  } finally {
    currentEffectFn = null
  }
}
// targetsMap保存依赖关系
// {target: {key: [eff1,eff2,.....]}}
const targetsMap = new WeakMap()
// 依赖存储
function track(target, key) {
  if (currentEffectFn) {
    let depMaps = targetsMap.get(target)
    if (!depMaps) {
      depMaps = new Map()
      targetsMap.set(target, depMaps)
    }
    let deps = depMaps.get(key)
    if (!deps) {
      deps = new WeakSet()
      depMaps.set(key, deps)
    }
    if (!deps.has(currentEffectFn)) {
      deps.add(currentEffectFn)
    }
  }
}
// 触发依赖
function trigger(target, type, key) {
  let depMaps = targetsMap.get(target)
  if (depMaps) {
    let deps = depMaps.get(key)
    if (deps) {
      for (let effect of deps) {
        effect()
      }
    }
  }
}
// 数据响应式
const proxyMap = new WeakMap()
const proxyArray = new Set()
function reactive(obj) {
  if (!isObject) {
    return obj
  }
  if (proxyArray.has(obj)) {
    return proxyArray.get(obj)
  }
  if (proxyArray.has(obj)) {
    return obj
  }
  const res = new Proxy(obj, {
    get(target, key, receiver) {
      console.log(`正在访问${key}: ${target[key]}`)
      // 此处收集依赖
      track(target, key)
      const reso = Reflect.get(target, key, receiver)
      return isObject(reso) ? reactive(reso) : reso
    },
    set(target, key, value, receiver) {
      if (value !== target[key]) {
        if (isObject(value)) {
          reactive(value)
        }
        console.log(`设置属性${key}: ${value}`)

        Reflect.set(target, key, value, receiver)
        // 此处触发依赖执行
        trigger(target, key)
      }
    },
    deleteProperty(target, key) {
      console.log(`删除了属性${key}`)
      Reflect.defineProperty(target, key)
    }
  })
  proxyMap.set(obj, res)
  proxyArray.add(res)
  return res
}
const data = reactive({
  a: 100,
  b: 2,
  color: { red: 1 }
})
// data.a = 1000
// data.color.red = 100
data.color.blue = { c: 3 }
data.color.blue.c = 100
effect(() => {
  console.log(`发生改变了${data.color.red}`)
})
setInterval(() => {
  data.color.red++
}, 1000)
