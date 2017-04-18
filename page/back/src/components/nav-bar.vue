<template>
  <div id="nav-bar">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-narbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">邱焱坤<small>的博客</small> 后台</router-link>
        </div>
        <div class="collapse navbar-collapse" id="collapse-narbar">
          <ul class="nav navbar-nav">
            <li :class="{ active: isArticleListActive }">
              <router-link to="/admin" @click.native="clickArticleList">
                <small><span class="glyphicon glyphicon-file" aria-hidden="true"></span></small> 文章
              </router-link>
            </li>
            <li :class="{ active: isClassListActive }">
              <router-link to="/admin/classification" @click.native="clickClassList">
                <small><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></small> 分类
              </router-link>
            </li>
            <li :class="{ active: isCommentListActive }">
              <router-link to="/admin/comment" @click.native="clickCommentList">
                <small><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></small> 评论
              </router-link>
            </li>
          </ul>
          <router-link to="/admin/editor" @click.native="clickNew">
            <button type="button" class="btn btn-primary navbar-btn pull-right">
              <small><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></small> 写博客
            </button>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isArticleListActive: true,
      isClassListActive: false,
      isCommentListActive: false
    }
  },
  methods: {
    clickArticleList () {
      this.isArticleListActive = true
      this.isClassListActive = false
      this.isCommentListActive = false
    },
    clickClassList () {
      this.isArticleListActive = false
      this.isClassListActive = true
      this.isCommentListActive = false
    },
    clickCommentList () {
      this.isArticleListActive = false
      this.isClassListActive = false
      this.isCommentListActive = true
    },
    clickNew () {
      this.isArticleListActive = false
      this.isClassListActive = false
      this.isCommentListActive = false
    }
  }
}
</script>
