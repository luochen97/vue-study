export default {
  render(h) {
    // 标记当前router-view的深度
    this.$vnode.data.routerView = true
    // 初始化当前router-views深度
    let depth = 0
    let parent = this.$parent

    while (parent) {
      const vodeData = parent.$vnode && parent.$vnode.data
      if (vodeData && vodeData.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    this.$vnode.data.depth = depth
    const matched = this.$router.matched[depth]
    const component = matched && matched.component
    //   const {current, options} = this.$router
    //   const component = (options.routes.find(item => item.path === current)|| {component:null}).component
    // 获取path对应的component

    return h(component)
  }
}
