import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

/* Event bus for the section 10 */
export const eventBus10 = new Vue()

/* Event bus for the section Bulletin */
export const eventBusBulletin = new Vue()

new Vue({
  el: '#app',
  render: h => h(App),
})
