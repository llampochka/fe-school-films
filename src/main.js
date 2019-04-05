import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import FlashMessage from '@smartweb/vue-flash-message'
Vue.use(FlashMessage, {
  time: 5000,
  icon: true
})

import router from './Router'
import store from './Store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

import _ from 'lodash';    
Object.defineProperty(Vue.prototype, '$_', { value: _ })

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/custom.scss'
