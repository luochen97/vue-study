import message from './message.vue'
import Vue from 'vue'

const compContructor = Vue.extend(message)

const Message = function (options) {
  options.onClose = function () {}
  const compInstence = new compContructor({
    data: options
  })
  const compVnode = compInstence.$mount()
  document.body.appendChild(compVnode.$el)
  options.onClose = function () {
    compInstence.$destroy()
    document.body.removeChild(this.$el)
  }
}

;['success', 'error', 'info', 'warning'].forEach((type) => {
  Message[type] = (options) =>
    Message({
      message: options,
      type
    })
})

export default Message
