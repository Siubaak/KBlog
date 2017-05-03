<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav-bar></nav-bar>
    <!-- 内容栏 -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-offset-1 col-sm-2 hidden-xs">
          <slide></slide>
        </div>
        <div class="col-sm-8">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from './components/nav-bar'
import slide from './components/slide'
export default {
  name: 'app',
  components: {
    navBar,
    slide
  }
}
</script>
