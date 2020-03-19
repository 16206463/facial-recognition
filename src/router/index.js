import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Home'
import loginPage from '@/components/loginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/facialRecognition',
      name: 'facialRecognition',
      component: Homepage
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    }
  ]
})
