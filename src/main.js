// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import axios from 'axios';



Vue.prototype.$http=axios;
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(router);


//全局设置
Vue.prototype.$Message.config({
  top: 50,
  duration: 3
});
Vue.prototype.$Notice.config({
  duration: 10
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
