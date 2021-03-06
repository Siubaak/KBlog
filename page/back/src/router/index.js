import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '../components/login'
import Admin from '../components/admin'
import ArticleList from '../components/article-list'
import ClassList from '../components/class-list'
import CommentList from '../components/comment-list'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [{
      path: '',
      name: 'article-list',
      component: ArticleList
    },
    {
      path: 'classification',
      name: 'class-list',
      component: ClassList
    },
    {
      path: 'comment',
      name: 'comment-list',
      component: CommentList
    }]
  }]
})

router.beforeEach(({ path }, from, next) => {
  let isLogin = Boolean(store.state.token)
  if (!isLogin && path !== '/login') {
    next('/login')
  } else if (isLogin && path === '/login') {
    next('/admin')
  } else {
    next()
  }
})

export default router
