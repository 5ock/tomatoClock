import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("@/assets/icons", true, /\.svg$/)
requireAll(req)

new Vue({
  render: h => h(App),
}).$mount('#app')
