  import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Home'
import loginPage from '@/components/loginPage'
import userPage from '@/components/userPage'

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
    },
    {
      path: '/userPage',
      name:'userPage',
      component: userPage
    }
  ],
  mode: 'history',
})
