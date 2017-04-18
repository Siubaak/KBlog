<template>
  <div id="article-list">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
          分类列表
        </h4>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="classificationItem in classifications">
          {{ classificationItem.name }}
          <div class="pull-right">
            <button type="button" class="btn btn-xs btn-primary">编辑</button>
            <button type="button" class="btn btn-xs btn-danger">删除</button>
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
      classifications: []
    }
  },
  methods: {
    loadClassifications () {
      api.getClassificationList()
        .then((res) => {
          this.classifications = res.data.classList
          console.log('-- Successful Receive')
        })
        .catch((err) => {
          console.log(err)
          console.log('-- Error Receive')
        })
    }
  },
  created () {
    this.loadClassifications()
  }
}
</script>
