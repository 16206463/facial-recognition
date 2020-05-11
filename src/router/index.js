import Vue from 'vue'
import Router from 'vue-router'
import questionPage from '@/components/questionPage'

import finishPage from '@/components/finish'

import loginPage from '@/components/loginPage'
import userPage from '@/components/userPage'
import adminPage from '@/components/adminPage'
import registerPage from '@/components/register'
import studentDetail from '@/components/studentDetail'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', redirect: '/loginPage' },
    {
      path: '/question',
      name: 'question',
      component: questionPage
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/userPage/:username',
      component: userPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminPage
    },
    {
      path: '/register',
      name: 'register',
      component: registerPage
    },
    {
      path: '/finish',
      name: 'finish',
      component: finishPage
    },
    {
      path: '/studentDetail/:studentID',
      component: studentDetail
    },

  ],
  // mode: 'history',
})
