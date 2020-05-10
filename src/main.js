// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import less from 'less'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(codemirror)

import VueCodemirror from "vue-codemirror/src";
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)

Vue.use(less)
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.defaults.baseURL = 'http://118.178.254.65:8000'

// axios.defaults.baseURL = 'http://localhost:8000'
