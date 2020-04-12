  import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Home'
import loginPage from '@/components/loginPage'
import userPage from '@/components/userPage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', redirect: '/loginPage' },
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
      path: '/userPage/:username',
      component: userPage
    }
  ],
  mode: 'history',
})
