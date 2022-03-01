import formItem from './formItem'
formItem.install = function (Vue) {
  Vue.component(formItem.name, formItem)
}

export default formItem