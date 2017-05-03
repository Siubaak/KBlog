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
          <editor id="new-article" class="collapse"
            :articleItem="{}" :classifications="classifications" @save="loadArticles">
          </editor>
        </li>
        <li class="list-group-item" v-for="(articleItem, index) in articles">
          <small><span class="glyphicon glyphicon-file"></span></small>
          {{ articleItem.title }}
          <small><span class="glyphicon glyphicon-time"></span></small>
          {{ articleItem.date }}
          <div class="edit-group">
            <button type="button" data-toggle="collapse"
              :href="'#' + articleItem._id" class="btn btn-sm btn-primary">编辑</button>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-danger dropdown-toggle"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                删除
              </button>
              <ul class="dropdown-menu">
                <li class="delete">
                  <div class="input-group">
                    <input v-model="ok" type="text" class="form-control input-sm">
                    <span class="input-group-btn">
                      <button class="btn btn-sm btn-danger" type="button" @click="removeArticle(index, articleItem._id)">确认</button>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <editor v-if="isEditorShow" :id="articleItem._id" class="collapse"
              :articleItem="articleItem" :classifications="classifications" @save="loadArticles">
            </editor>
          </div>
        </li>
        <li class="list-group-item" v-show="!articles.length">没有文章</li>
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
      isEditorShow: true,
      ok: '',
      classifications: [],
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
      this.isEditorShow = false
      api.getArticleList({ page: this.page, number: this.number })
        .then((res) => {
          this.articles = res.data.articleList
          this.isEditorShow = true
        })
    },
    loadClassifications () {
      api.getClassificationList()
        .then((res) => {
          this.classifications = res.data.classList
        })
    },
    removeArticle (index, articleId) {
      if (this.ok === 'ok') {
        this.ok = ''
        api.removeArticle({ articleId })
          .then((result) => {
            this.articles.splice(index, 1)
          })
      }
    }
  },
  created () {
    this.loadArticles()
    this.loadClassifications()
  }
}
</script>

<style scoped>
.delete {
  padding: 0px 5px;
}
.edit-group {
  margin-top: 5px;
}
</style>
