<template>
  <div id="editor" class="editor">
    <form role="form" @submit.prevent="saveArticle">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" class="form-control" id="title" v-model="article.title" required>
      </div>
      <div class="form-group">
        <label for="class">分类</label>
        <select class="form-control" v-model="article.classification">
          <option v-for="classificationItem in classifications">{{ classificationItem.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="intro">简介</label>
        <textarea type="text" class="form-control comment-box" id="intro"
                  rows="3" v-model="article.intro" required>
        </textarea>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea type="text" class="form-control comment-box" id="content"
                  rows="7" v-model="article.body" required>
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-group btn-group-justified">
        <small><span class="glyphicon glyphicon-floppy-disk"></span></small> 保存
      </button>
    </form>
  </div>
</template>

<script>
import api from '../api'
export default {
  props: ['articleItem', 'classifications'],
  data () {
    return {
      article: {
        _id: this.articleItem._id,
        title: this.articleItem.title,
        intro: this.articleItem.intro,
        body: this.articleItem.body,
        classificationId: this.articleItem.classificationId,
        classification: this.articleItem.classification
      }
    }
  },
  methods: {
    reset () {
      this.article._id = ''
      this.article.title = ''
      this.article.intro = ''
      this.article.body = ''
      this.article.classificationId = ''
      this.article.classification = ''
    },
    classificationIdQuery (name) {
      for (let classificationItem of this.classifications) {
        if (classificationItem.name === name) {
          return classificationItem._id
        }
      }
    },
    loadApi () {
      if (!this.articleItem._id) {
        return api.createArticle(this.article)
      } else {
        return api.updateArticle(this.article)
      }
    },
    saveArticle () {
      this.article.classificationId = this.classificationIdQuery(this.article.classification)
      this.loadApi()
        .then((result) => {
          if (!this.articleItem._id) {
            // 新建文章后清空数据
            this.reset()
          }
          this.$emit('save')
        })
    }
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
.editor {
  margin: 10px 0px;
}
</style>
