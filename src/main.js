import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

Vue.config.productionTip = false
import request from "./axios";
Vue.prototype.$axios = request

require("./mock") //引入mock数据，关闭则注释该行
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
