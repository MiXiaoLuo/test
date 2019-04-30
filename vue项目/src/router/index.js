import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Mycenter from '@/pages/Mycenter';
import PublishArticle from '@/pages/PublishArticle'
import ArticleContent from '@/pages/ArticleContent'
import UpdateMyInfo from '@/pages/UpdateMyInfo'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'Home',
    component: Home
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/mycenter',
    name: 'Mycenter',
    component: Mycenter
  },{
    path: '/publish',
    name: 'PublishArticle',
    component: PublishArticle
  },{
    path: '/content/:id',
    name: 'ArticleContent',
    component: ArticleContent
  },{
    path: '/updateMyInfo',
    name: 'UpdateMyInfo',
    component: UpdateMyInfo
  },{
    path: '*',
    redirect: '/home'
  }]
})
