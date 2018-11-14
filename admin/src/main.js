// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//将状态管理的文件引入进来
import store from '@/store'
//将图标库的JS文件引入进来
import '@/assets/image/icon/iconfont'
//将全局的样式引入进来
import '@/assets/style'
//如果以后做项目,vue里面的插件都是在main.js入口文件中引入的
//这是引入一个表单验证插件
import VeeValidate from 'vee-validate'
//引入一个消息提示的插件
import Notifications from 'vue-notification'
//加入权限判断
import '@/permission'

Vue.use(VeeValidate)
Vue.use(Notifications)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
