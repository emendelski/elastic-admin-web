import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import alert from './store/alert'

Vue.use(Vuex)

export default new Store({
  modules: {
    alert,
  },
})
