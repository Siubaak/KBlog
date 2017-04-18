<template>
  <div id="article-list">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
          文章列表
        </h4>
      </div>
      <ul class="list-group">
        <li class="list-group-item">
          <button type="button" data-toggle="collapse"
              href="#new-article" class="btn btn-primary btn-group btn-group-justified">新建文章</button>
          <editor id="new-article" class="collapse"></editor>
        </li>
        <li class="list-group-item" v-for="articleItem in articles">
          {{ articleItem.title }}<br>
          {{ articleItem.date }}
          <div class="pull-right">
            <button type="button" class="btn btn-xs btn-primary">编辑</button>
            <button type="button" class="btn btn-xs btn-danger">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import editor from './editor'
import api from '../api'
export default {
  data () {
    return {
      articles: [],
      page: 0,
      number: 0
    }
  },
  components: {
    editor
  },
  methods: {
    loadArticles () {
      api.getArticleList({ page: this.page, number: this.number })
        .then((res) => {
          this.articles = res.data.articleList
          console.log('-- Successful Receive')
        })
        .catch((err) => {
          console.log(err)
          console.log('-- Error Receive')
        })
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>
