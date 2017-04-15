<template>
  <div id="article-list" v-scroll="loadArticles">
    <div v-for="article in articles">
      <article-item :articleInput="article"></article-item>
    </div>
    <div class="well well-sm" v-show="isAll">
      <div class="note" v-show="!isLoading">
        <span class="glyphicon glyphicon-ok"></span> 所有文章载入完毕
      </div>
    </div>
  </div>
</template>

<script>
import articleItem from './article-item'
import api from '../api'
export default {
  data () {
    return {
      articles: [],
      page: 0,
      number: 5,
      isLoading: false,
      isAll: false
    }
  },
  components: {
    articleItem
  },
  directives: {
    scroll: {
      bind: function (el, binding) {
        window.addEventListener('scroll', function () {
          if (document.body.scrollTop + window.innerHeight === document.body.scrollHeight) {
            (binding.value)()
          }
        })
      }
    }
  },
  watch: {
    '$route': 'reset'
  },
  methods: {
    reset () {
      this.page = 0
      this.articles = []
      this.isAll = false
      this.loadArticles()
    },
    // 根据name是否为undefined来判断在首页还是分类
    loadApi ({ name, page, number }) {
      if (name) {
        return api.getArticleListByClassification({ name, page, number })
      } else {
        return api.getArticleList({ page, number })
      }
    },
    loadArticles () {
      var self = this
      if (!self.isLoading && !self.isAll) {
        self.isLoading = true
        self.loadApi({ name: this.$route.params.name, page: self.page, number: self.number })
          .then(function (res) {
            if (res.data.articleList.length) {
              self.articles = self.articles.concat(res.data.articleList)
              self.page++
              console.log('-- Successful Receive')
            } else {
              self.isAll = true
            }
            self.isLoading = false
          })
          .catch(function (err) {
            console.log(err)
            console.log('-- Error Receive')
            self.isLoading = false
          })
      }
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>

<style scoped>
.note {
  text-align: center
}
</style>
