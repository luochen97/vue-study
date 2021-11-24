
import view from './views'
let vue
class VueRouter{
    constructor(options) {
      this.options = options
      this.current = window.location.hash.slice(1)
      // vue.util.defineReactive(this,'current', window.location.hash.slice(1))
      vue.util.defineReactive(this,'matched', [])
      this.match()
      window.addEventListener('hashchange',() => {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
      })
    }
    match(routes) {
      const routeArr = routes || this.options.routes
      for(let route of routeArr) {
        if(route.path === '/' && this.current === '/') {
          this.matched.push(route) 
          return
        }
        if(route.path !== '/' && this.current.includes(route.path)) {
          console.log(route, this.current)
          this.matched.push(route)
          if(route.children&&route.children.length) {
            this.match(route.children)
          }
          return
        }
      }
    }
    push(obj) {
      if(!Object.keys(obj).length) {
        throw Error('argumnents must be Object!') 
      }
      window.location.hash= obj.path
      this.match()
    }
}
VueRouter.install = function(_vue) {
  vue = _vue
  vue.mixin({
    beforeCreate() {
      if(this.$options.router) {
        vue.prototype.$router = this.$options.router
      }
    }
  })
  vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true
      }
    },
    render(h) {
      return h('a',{attrs: {href: `#${this.to}`}}, this.$slots.default)
    }
  })
  vue.component('router-view', view)
}
export default VueRouter