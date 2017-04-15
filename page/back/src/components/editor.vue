<template>
  <div id="editor">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          编辑
        </h4>
      </div>
      <div class="panel-body">
        <form action="">
          <div class="form-group">
            <label for="title">标题</label>
            <input type="text" class="form-control" id="title" required>
          </div>
          <div class="form-group">
            <label for="class">分类</label>
            <div class="row" id="class">
              <div class="col-xs-6">
                <select class="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div class="col-xs-6">
                <button class="btn btn-default">
                  <small><span class="glyphicon glyphicon-plus"></span></small> 新建分类
                </button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="intro">简介</label>
            <textarea type="text" class="form-control comment-box" id="intro"
                          rows="5" required>
            </textarea>
          </div>
          <div class="form-group">
            <label for="content">内容</label>
            <textarea type="text" class="form-control comment-box" id="content"
                          rows="30" required>
            </textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            <small><span class="glyphicon glyphicon-floppy-disk"></span></small> 保存
          </button>
        </form>
      </div>
    </div>
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

<style scoped>
textarea {
  resize: none;
}
</style>
