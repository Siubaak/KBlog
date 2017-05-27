<template>
  <div id="article-list" v-scroll="loadArticles">
    <div v-for="article in articles">
      <article-item :article="article"></article-item>
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
      bind: (el, binding) => {
        window.addEventListener('scroll', () => {
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
    loadApi () {
      if (this.$route.params.name) {
        return api.getArticleListByClassification({ name: this.$route.params.name, page: this.page, number: this.number })
      } else {
        return api.getArticleList({ page: this.page, number: this.number })
      }
    },
    loadArticles () {
      if (!this.isLoading && !this.isAll) {
        this.isLoading = true
        this.loadApi()
          .then((res) => {
            if (res.status === 200) {
              if (res.data.articleList.length) {
                this.articles = this.articles.concat(res.data.articleList)
                this.page++
              } else if (!res.data.err) {
                this.isAll = true
              }
            } else {
              alert(res.data.msg)
            }
            this.isLoading = false
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
