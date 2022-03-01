class NVue{
  constructor(options) {
    this.$options = options
    this.$data = typeof options.data === 'function' ? options.data() : options.data
    this.$el = options.el
    this.$method = options.methods
    Observe(this.$data)
    proxy(this, '$data')
    proxy(this, '$method')
    new Compile(this, this.$el)
  }
}
class Compile{
  constructor(vm, el) {
    this.vm = vm
    this.rootNode = document.querySelector(el)
    this.initNode(this.rootNode.childNodes)
  }
  initNode(childNodes) {
    for(let node of childNodes) {
      // nodeType 1:元素 3 文本
      if(node.nodeType === 1) {
        // 获取node节点所有属性，判断是否有动态属性
        // 继续判断子节点
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          if(attr.name.startsWith('n-')) {
            const key = attr.name.substring(2)
            if(key === 'model') {
              node.addEventListener('input', e => {
                this.vm[attr.value] = e.target.value
              })
            }
            this.update(node,this.vm[attr.value], key, attr.value)
          }else if(attr.name.startsWith('@')) {
            node.addEventListener(attr.name.substring(1), e=> {
              this.vm[attr.valu].bind(this.vm)(e)
            })
          }
        })
        if(node.childNodes.length) {
          this.initNode(node.childNodes)
        }
      } else if(node.nodeType === 3) {
        // 判断是否是模版形式{{counter}}
        if(/\{\{(.*)\}\}/.test(node.textContent)) {
            const keys = RegExp.$1.split('.')
            const len = keys.length
            let i = 1
            let value = this.vm[keys[0]]
            while(i < len) {
              value = value[keys[i]]
              i++
            }
            this.update(node, value, 'text', RegExp.$1)
        }
         
      } 
    }
  }
  update(node, val, key, keyword) {
    const fn = this[key+'Updater']
    console.log(key+'Updater')
    fn && fn(node,val)
    new Watcher(this.vm, keyword, val => fn(node, val))
  }
  textUpdater(node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }
  modelUpdater(node, val) {
    node.value = val
  }
  showUpdater(node, val){
    const text = val ? 'display: block;background: #ff0' : 'display:none'
    node.style.cssText = text
  }
}
// 数据做一层代理
function proxy(vm, data) {
  Object.keys(vm[data]).forEach(key => {
    Object.defineProperty(vm,key, {
        get() {
          return vm[data][key]
        },
        set(val) {
          vm[data][key] = val
        }
    })
  })
}
// 初始化为data设置响应式
function Observe(data) {
  if(isNoObject(data)) return
  // 如果是对象，区分数组和对象
  if(Array.isArray(data)) {
    // 数组时，在原型前建立一层拦截器
    const arrayProto = Array.prototype
    const arrayProtoNew = ['push','pop','shift','unshift','splice','sort','reverse'].forEach(method => {
        arrayProto[method].apply(this)
        // 1.在这里进行依赖收集
        // 2.对新增数据增加响应式效果
    })
    Object.setPrototypeOf(data, arrayProtoNew)
  } else {
    // 若为对象，为对象每一个key设置set，get
    walk(data)
  }
}
function walk(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj,key,obj[key])
  })
}
function defineReactive(target, key, val) {
  Observe(val)
  // 设置依赖收集器
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      /**
       * 1.收集依赖
       * 2.返回对应的值
      */
      console.log(`${key}:${val}`)
      // 收集依赖
      Dep.target&&dep.addDeps(Dep.target)
      return val
    },
    set(newValue) {
      /**
       * 1.如果新值和旧值不一样，保存新值
       * 2.对新值增加响应式
       * 3.通知依赖更新视图
      */
     if(val != newValue) {
        // console.log(`正在设置${key}:${newValue}`)
        val = newValue
        Observe(newValue)
        // 待做通知依赖更新视图
        dep.notify()
     }
    }
  })
}
// 判断是否是对象
function isNoObject(obj) {
  return typeof obj !== 'object' || obj == null
}
// 依赖管理类
class Dep{
  constructor() {
    this.deps = []
  }
  addDeps(dep) {
    this.deps.push(dep)
  }
  notify() {
    for(let dep of this.deps) {
       dep.update()
    }
  }
}
// 监听器类
class Watcher{
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater
    Dep.target = this
    this.getter(this.key)
    Dep.target = null
  }
  getter(key) {
    if(key.includes('.')) {
      const params = key.split('.')
      let value=this.vm[params[0]],i = 1
      const len = params.length
      while(i < len) {
        value = value[params[i]]
        i++
      }
      return value
    } else {
      this.vm[key]
      return this.vm[key]
    }
  }
  update() {
    this.updater.call(this, this.getter(this.key))
  }
}