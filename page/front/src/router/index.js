import Vue from 'vue'
import Router from 'vue-router'
import articleList from '@/components/article-list'
import about from '@/components/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'article-list',
      component: articleList
    },
    {
      path: '/classification/:name',
      name: 'class-article-list',
      component: articleList
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
