<template>
  <div id="article-item">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span class="label label-primary">{{ article.classification }}</span> {{ article.title }}
          <a class="pull-right" data-toggle="collapse"
              :href="'#'+article._id" @click="isArticleCollaspe = !isArticleCollaspe" role="button">
            <span :class="{ 'glyphicon': true,
                            'glyphicon-chevron-up': isArticleCollaspe,
                            'glyphicon-chevron-down': !isArticleCollaspe }">
            </span>
          </a>
        </h4>
      </div>
      <div class="panel-body">
        <section class="sec-intro">{{ article.intro }}</section>
        <small><span class="glyphicon glyphicon-time"></span></small> {{ article.date }}
        <div v-show="article.comments.length" class="pull-right">
          <small><span class="p-color glyphicon glyphicon-comment"></span></small> ({{ article.comments.length }})
        </div>
      </div>
      <div :id="article._id" class="panel-collapse collapse">
        <div class="panel-body">
          <div class="article-content" v-html="article.body"></div>
          <button type="button" class="btn btn-sm btn-primary btn-comment" data-toggle="collapse" 
                  :href="'#' + article._id + 'comment'" aria-expanded="false" aria-controls="collapseExample">
            <small><span class="glyphicon glyphicon-comment"></span></small> 评论
          </button>
          <div class="collapse" :id="article._id + 'comment'">
            <div class="well well-sm">
              <form class="form-horizontal" role="form" @submit.prevent="submit">
                <input v-model="comment.user" type="text" class="form-control comment-box" placeholder="姓名" maxlength="10" required>
                <textarea v-model="comment.msg" type="text" class="form-control comment-box" 
                          rows="5" placeholder="内容" required>
                </textarea>
                <button type="submit" class="btn btn-sm btn-primary">
                  <small><span class="glyphicon glyphicon-send"></span></small> 发表
                </button>
              </form>
            </div>
          </div>
          <div class="well well-sm" v-for="commentItem of article.comments">
            <small><span class="glyphicon glyphicon-user"></span></small>
            <strong class="p-color">{{ commentItem.user }} </strong>
            <small><span class="glyphicon glyphicon-time"></span></small>
            {{ commentItem.date }}<br>
            <small><span class="glyphicon glyphicon-comment"></span></small>
            {{ commentItem.msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      article: this.articleInput,
      comment: {
        user: '',
        msg: '',
        articleId: this.articleInput._id
      },
      isArticleCollaspe: false
    }
  },
  props: ['articleInput'],
  methods: {
    submit () {
      if (this.comment.user && this.comment.msg) {
        api.createComment(this.comment)
          .then((res) => {
            api.getOneArticle({ articleId: this.article._id })
              .then((res) => {
                if (res.data.article) {
                  this.article = res.data.article[0]
                  this.comment.user = ''
                  this.comment.msg = ''
                  console.log('-- Successful Create and Refresh')
                }
              })
              .catch((err) => {
                console.log(err)
                console.log('-- Error Create')
              })
          })
          .catch((err) => {
            console.log(err)
            console.log('-- Error Create')
          })
      }
    }
  }
}
</script>

<style scoped>
.sec-intro {
  padding-bottom: 10px;
}
.btn-comment {
  margin-bottom: 18px;
}
.comment-box {
  margin-bottom: 5px;
}
.article-content {
  margin-top: -10px;
  margin-bottom: 25px;
}
textarea {
  resize: none;
}
.label {
  padding: .2em .6em;
  font-size: 95%;
  font-weight: 400;
}
.well-sm {
  margin-bottom: 9px;
}
.p-color {
  color: #337AB7;
}
</style>
