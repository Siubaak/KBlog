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
          <router-link class="navbar-brand" to="/" @click.native="clickHome">
            邱焱坤<small>的博客</small>
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="collapse-narbar">
          <ul class="nav navbar-nav">
            <li :class="{ 'active': isHomeActive }">
              <router-link to="/" @click.native="clickHome">
                <small><span class="glyphicon glyphicon-home" aria-hidden="true"></span></small> 首页
              </router-link>
            </li>
            <li :class="{ 'dropdown': true, 'active': isClassActive }">
              <a href="#" class="dropdown-toggle"
                 data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false">
                <small><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></small> 分类
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li v-for="classification in classificationList">
                  <router-link :to="'/classification/' + classification.name" @click.native="clickClass">
                    <small><span class="glyphicon glyphicon-record" aria-hidden="true"></span></small> {{ classification.name }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li :class="{ 'active': isAboutActive }">
              <router-link to="/about" @click.native="clickAbout">
                <small><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></small> 关于
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      classificationList: [],
      isHomeActive: true,
      isClassActive: false,
      isAboutActive: false
    }
  },
  methods: {
    clickHome () {
      this.isHomeActive = true
      this.isClassActive = false
      this.isAboutActive = false
    },
    clickClass () {
      this.isHomeActive = false
      this.isClassActive = true
      this.isAboutActive = false
    },
    clickAbout () {
      this.isHomeActive = false
      this.isClassActive = false
      this.isAboutActive = true
    }
  },
  created () {
    api.getClassificationList()
      .then((res) => {
        if (res.status === 200) {
          this.classificationList = res.data.classList
        } else {
          alert(res.data.msg)
        }
      }).catch((err) => {
        console.error(err)
        alert('获取分类列表出错，请稍后再试')
      })
  }
}
</script>

<style scoped>
.profile {
  border-radius: 3px;
  width: 40px;
}
</style>
