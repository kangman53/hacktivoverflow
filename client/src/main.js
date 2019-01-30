import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false
Vue.use(VueSweetalert2)
Vue.use(wysiwyg, {
  maxHeight: '500px'
})

const local = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$axios = local

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
