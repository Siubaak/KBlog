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
        <li class="list-group-item">
          <button type="button" data-toggle="collapse"
              href="#new-classification" class="btn btn-primary btn-group btn-group-justified">新建分类</button>
          <div id="new-classification" class="edit collapse">
            <div class="input-group">
              <input type="text" class="form-control" v-model="name">
              <span class="input-group-btn">
                <button class="btn btn-primary" type="button" @click="createClassification()">确定</button>
              </span>
            </div>
          </div>
        </li>
        <li class="list-group-item" v-for="(classificationItem, index) in classifications">
          <small><span class="glyphicon glyphicon-record" aria-hidden="true"></span></small> {{ classificationItem.name }}
          <div class="edit-group">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown"
              @click="bindClassification(classificationItem)" aria-haspopup="true" aria-expanded="false">
                编辑
              </button>
              <ul class="dropdown-menu">
                <li class="delete">
                  <div class="input-group">
                    <input v-model="classificationEdit.name" type="text" class="form-control input-sm">
                    <span class="input-group-btn">
                      <button class="btn btn-sm btn-primary" type="button" @click="updateClassification">确认</button>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
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
                      <button class="btn btn-sm btn-danger" type="button" @click="removeClassification(index, classificationItem._id)">确认</button>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div :id="classificationItem._id" class="edit collapse">
              <div class="input-group">
                <input type="text" class="form-control" v-model="classificationEdit.name">
                <span class="input-group-btn">
                  <button class="btn btn-primary" type="button" @click="updateClassification">确定</button>
                </span>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item" v-show="!classifications.length">没有分类</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      classificationEdit: {
        _id: '',
        name: ''
      },
      name: '',
      ok: '',
      classifications: []
    }
  },
  methods: {
    loadClassifications () {
      api.getClassificationList()
        .then((res) => {
          if (res.status === 200) {
            this.classifications = res.data.classList
          } else {
            alert(res.data.msg)
          }
        }).catch((err) => {
          console.error(err)
          alert('删除分类列表出错，请稍后再试')
        })
    },
    createClassification () {
      if (this.name) {
        api.createClassification({ name: this.name })
        .then((res) => {
          if (res.status === 200) {
            this.name = ''
            this.loadClassifications()
          } else {
            alert(res.data.msg)
          }
        }).catch((err) => {
          console.error(err)
          alert('创建分类出错，请稍后再试')
        })
      } else {
        alert('请输入分类名称')
      }
    },
    bindClassification (classification) {
      this.classificationEdit._id = classification._id
      this.classificationEdit.name = classification.name
    },
    updateClassification () {
      api.updateClassification({ classification: this.classificationEdit })
        .then((res) => {
          if (res.status === 200) {
            this.loadClassifications()
          } else {
            alert(res.data.msg)
          }
        }).catch((err) => {
          console.error(err)
          alert('更新分类出错，请稍后再试')
        })
    },
    removeClassification (index, classificationId) {
      if (this.ok === 'ok') {
        this.ok = ''
        api.removeClassification({ classificationId })
          .then((res) => {
            if (res.status === 200) {
              this.classifications.splice(index, 1)
            } else {
              alert(res.data.msg)
            }
          }).catch((err) => {
            console.error(err)
            alert('删除分类出错，请稍后再试')
          })
      }
    }
  },
  created () {
    this.loadClassifications()
  }
}
</script>

<style scoped>
.delete {
  padding: 0px 5px;
}
.edit-group {
  margin-top: 5px;
}
.edit {
  margin-top: 10px;
}
</style>
