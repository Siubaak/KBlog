<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav-bar></nav-bar>
    <!-- 内容栏 -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-offset-2 col-sm-8 col-xs-12">
          <editor></editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from './components/nav-bar'
import editor from './components/editor'
export default {
  name: 'app',
  components: {
    navBar,
    editor
  }
}
</script>
