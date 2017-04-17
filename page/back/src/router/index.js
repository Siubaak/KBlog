import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '../components/login'
import Admin from '../components/admin'
import ArticleList from '../components/article-list'
import ClassList from '../components/class-list'
import CommentList from '../components/comment-list'
import Editor from '../components/editor'

Vue.use(Router)

var router = new Router({
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
    },
    {
      path: 'editor/:articleId',
      name: 'editor',
      component: Editor
    }]
  }]
})

router.beforeEach(({ path }, from, next) => {
  var isLogin = Boolean(store.state.token)
  if (!isLogin && path !== '/login') {
    next('/login')
  } else if (isLogin && path === '/login') {
    next('/admin')
  } else {
    next()
  }
})

export default router
