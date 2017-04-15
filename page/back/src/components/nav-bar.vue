<template>
  <div id="nav-bar">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-narbar">
            <span class="sr-only">导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">崔济东<small>的博客</small> <b>后台</b></router-link>
        </div>
        <div class="collapse navbar-collapse" id="collapse-narbar">
          <ul class="nav navbar-nav">
            <li :class="{ active: isAboutActive }">
              <router-link to="/about" @click.native="clickAbout">
                <small><span class="glyphicon glyphicon-book" aria-hidden="true"></span></small> 文章归档
              </router-link>
            </li>
            <li :class="{ active: isHomeActive }">
              <router-link to="/" @click.native="clickHome">
                <small><span class="glyphicon glyphicon-fire" aria-hidden="true"></span></small> 最新评论
              </router-link>
            </li>
          </ul>
          <router-link to="/about" @click.native="clickAbout">
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
  },
  methods: {
  }
}
</script>
