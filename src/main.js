import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside
Vue.directive('click-outside', {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if(typeof binding.value !== 'function') {
      var compName = vNode.context.name;
      var warn = '[Vue-click-outside:] provided expression ' + binding.expression + ' is not a function, but has to be';

      if(compName) {
        warn += 'Found in component ' + compName;
      }
      
      console.warn(warn);
    }
    
    // Define Handler and cache it on the element
    var bubble = binding.modifiers.bubble;
    var handler = function(e) { 
      if(bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    };
    
    el.__vueClickOutside__ = handler;
    // add Event Listeners
    document.addEventListener('click', handler)
  },
  unbind: function (el) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null
  }
})


const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("@/assets/icons", true, /\.svg$/)
requireAll(req)

new Vue({
  render: h => h(App),
}).$mount('#app')
