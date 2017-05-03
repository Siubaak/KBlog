<template>
  <div id="login">
    <div class="login center-block">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            后台管理
          </h4>
        </div>
        <div class="panel-body">
          <form class="form-horizontal" role="form" @submit.prevent="login">
            <div class="form-group">
              <label for="account" class="col-sm-3 control-label">账号</label>
              <div class="col-sm-8">
                <input v-model="admin.account" type="text" class="form-control" id="account" required>
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-sm-3 control-label">密码</label>
              <div class="col-sm-8">
                <input v-model="admin.password" type="password" class="form-control" id="password" required>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-9">
                <button type="submit" class="btn btn-primary">
                  <small><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></small> 登录
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      admin: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.admin.account && this.admin.password) {
        this.$store.dispatch('adminLogin', this.admin)
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 300px;
}
</style>
