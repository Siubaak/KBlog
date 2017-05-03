<template>
  <div id="about">
    <!-- 博客介绍 -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          博客介绍
        </h4>
      </div>
      <div class="panel-body">
        <div v-html="blogIntro"></div>
      </div>
    </div>
    <!-- 个人介绍 -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          个人介绍
        </h4>
      </div>
      <div class="panel-body">
        <div v-html="personIntro"></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  data () {
    return {
      personIntro: '',
      blogIntro: ''
    }
  },
  created () {
    this.personIntro = marked('博主是华南理工大学建筑与土木工程的研究生，目前对力学、有限元、前后端开发等感兴趣，还在努力点亮前后端开发的技能。\r\r希望能多学一些感兴趣的东西，也想尝试不同的生活、工作。\r\r目前技能树：\r- 结构设计及分析（★★★★☆）\r- 有限元（★★★★☆）\r- 力学（★★★☆☆）\r- C++/C#（★★★☆☆）\r- 前后端开发（★★☆☆☆）\r\r欢迎大家联系我，结构方面、计算机方面都聊得来。\r\r- QQ：416142323\r- 邮箱：q.yk@qq.com')
    this.blogIntro = marked('本博客是博主第一个前后端开发项目，为前后端分离的单页面应用，项目地址见[这里](https://github.com/Siubaak/KBlog)，具体开发介绍可见博文。\r\r以后不定期对该项目进行更新和改进，目前的任务是完成服务端渲染和搜索引擎优化。\r\r计划每个月更新二到四篇博文，包括结构、力学、编程、闲谈等方面的内容。')
  }
}
</script>
