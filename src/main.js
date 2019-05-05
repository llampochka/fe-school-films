import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

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

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields'
})

import router from './Router'
import store from './Store'
import App from './App.vue'

Vue.config.productionTip = false

import _ from 'lodash'   
Object.defineProperty(Vue.prototype, '$lodash', { value: _ })

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './styles/variables.scss'
// import "../node_modules/bootstrap/scss/bootstrap.scss"

// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './styles/custom.scss'
