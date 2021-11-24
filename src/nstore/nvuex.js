let Vue
/* getters
 * 遍历getters数组，为getters的每一个keys设置
 * 
*/
class Store{
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    // this.getters = options.getters
    this.getters = {}
    const computed = {}
    const registerGetter = (fn, key) => {
      computed[key] = () => {
        const result = fn(this.state)
        return result
      }
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    }
    Object.keys(options.getters).forEach(key => {
      registerGetter(options.getters[key], key)
    })
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state
        }
      },
      computed: computed
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error("请用commit||dispatch来改变！")
    return
  }
  commit(type, keyword) {
    const mutation =  this._mutations[type]
    if(mutation) {
      mutation(this.state, keyword)
    }
    
  }
  dispatch(type, keyword) {
     const action = this._actions[type]
     if(action) {
      action(this, keyword)
     }
  }
}
function install(_Vue) {
  Vue = _Vue
  // 混入生命周期beforeCreate，提供vue中访问$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default {Store, install}