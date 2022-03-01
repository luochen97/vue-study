import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import router from './router'
import router from './nrouter'

// import store from './store'
import store from './nstore'

import create from "@/utils/create";
import Notice from "@/components/Notice.vue";
import { NElement } from '@/components/nform/index.js'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

Vue.prototype.$notice = function(props) {
  const notice = create(Notice, props);
  notice.show();
}
Vue.use(NElement)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
