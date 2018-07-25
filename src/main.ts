import '@/stylus/main.styl'
import Vue from 'vue'
import VueShortkey from 'vue-shortkey'
import Vuetify from 'vuetify'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// Use Vuetify
Vue.use(Vuetify)

// Use VueShortkey
Vue.use(VueShortkey)

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app')
