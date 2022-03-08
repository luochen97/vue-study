import nform from './nform/index'
import nformItem from './nformItem/index'
import nInput from './nInput/index'
import Message from './message/index.js'

const install = function (Vue) {
  ;[nform, nformItem, nInput].forEach((form) => {
    Vue.use(form)
  })
  Vue.prototype.$message = Message
}
export default { install, nform, nformItem, nInput }
