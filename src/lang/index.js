import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
let loadLanguage = 'en'
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}
function getLanguage() {
  // 第一次进入页面或手动清除设置默认语言
  let locale = localStorage.getItem('lang')
    ? null
    : localStorage.setItem('lang', loadLanguage)
  if (!(locale in messages)) locale = loadLanguage
  return locale
}
const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export default i18n
