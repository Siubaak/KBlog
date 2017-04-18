<template>
  <div id="article-list">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span class="glyphicon glyphicon-comment" aria-hidden="true"></span>
          评论列表
        </h4>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(commentItem, index) in comments">
          <small><span class="glyphicon glyphicon-user"></span></small>
          <strong class="p-color">{{ commentItem.user }} </strong>
          <small><span class="glyphicon glyphicon-time"></span></small>
          {{ commentItem.date }}<br>
          <small><span class="glyphicon glyphicon-comment"></span></small>
          {{ commentItem.msg }}<br>
          <small><span class="glyphicon glyphicon-file"></span></small>
          {{ commentItem.article.title }}
          <div class="pull-right">
            <button type="button" class="btn btn-xs btn-danger" @click="removeComment(index, commentItem._id)">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      comments: [],
      page: 0,
      number: 0
    }
  },
  methods: {
    loadComments () {
      api.getCommentList({ page: this.page, number: this.number })
        .then((res) => {
          this.comments = res.data.commentList
          console.log('-- Successful Receive')
        })
        .catch((err) => {
          console.log(err)
          console.log('-- Error Receive')
        })
    },
    removeComment (index, commentId) {
      api.removeComment({ commentId })
        .then((result) => {
          this.comments.splice(index, 1)
          console.log('-- Successful Remove')
        })
        .catch((err) => {
          console.log(err)
          console.log('-- Error Remove')
        })
    }
  },
  created () {
    this.loadComments()
  }
}
</script>

<style scoped>
.p-color {
  color: #337AB7;
}
</style>
