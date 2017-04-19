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
          <small><span class="glyphicon glyphicon-file"></span></small>
          {{ commentItem.article.title }}
          <small><span class="glyphicon glyphicon-time"></span></small>
          {{ commentItem.date }}<br>
          <small><span class="glyphicon glyphicon-comment"></span></small>
          {{ commentItem.msg }}
          <div class="edit-group">
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
                      <button class="btn btn-sm btn-danger" type="button" @click="removeComment(index, commentItem._id)">确认</button>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="list-group-item" v-show="!comments.length">没有评论</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      ok: '',
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
      if (this.ok === 'ok') {
        this.ok = ''
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
.delete {
  padding: 0px 5px;
}
.edit-group {
  margin-top: 5px;
}
</style>
