import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import hooks from '@u3u/vue-hooks'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
Vue.use(hooks);

new Vue({
  store,
  hooks,
  render: h => h(App),
}).$mount('#app')
