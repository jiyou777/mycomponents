import './lib'
import Vue from 'vue'
import App from './app'
import VueDragResize from 'vue-drag-resize'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AttrComponent from './attr'
window.Vue = Vue

Vue.use(ElementUI)
Vue.use(AttrComponent)
Vue.component('vue-drag-resize', VueDragResize)

new Vue(App).$mount('#app')

console.info('不要慌，"Method "$confirm" conflicts with an existing Vue instance method ..."错误完全在控制中，请忽略')
