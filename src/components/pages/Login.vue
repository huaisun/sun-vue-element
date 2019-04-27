<template>
  <div class="pan-class">
    <el-card class="box-card">
      <el-form :model="form" status-icon ref="form"
               class="demo-ruleForm">
        <div class="title-class">
          <i class="el-icon-s-platform title-icon-class"></i>
          <label class="title-label-class">登陆管理系统</label>
        </div>
        <el-form-item prop="username">
          <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入登陆名"  @keyup.enter.native="onsubmit"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"  @keyup.enter.native="onsubmit"></el-input>
        </el-form-item>
        <el-form-item class="button-form-class">
          <el-button type="primary" class="submit-class">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
      }
    },
    methods: {
      onsubmit() {
        let self = this;
        if (self.form.name === '' || self.form.password === '' || self.form.name.trim() === '' || self.form.password.trim() === '') {
          this.$message({
            message: '登陆名或密码不可为空',
            type: 'warning'
          });
        } else {
          self.$http.post('/sun/employ/login', self.form, {emulateJSON: true}).then((response) => {
            if (response.body.code === 1) {
              this.$router.push('milk');
            } else {
              this.$message({
                message: '登陆名或密码错误',
                type: 'error'
              });
            }
          }, (response) => {
            console.log(response);
          })

        }
      }
    }
  }
</script>

<style>
  .title-class {
    padding-top: 20px;
    padding-bottom: 20%;
  }

  .title-label-class {
    font-size: 18px;
  }

  .title-icon-class {
    font-size: 20px;
    color: #A16BFE;
  }
  .pan-class {
    float: right;
    margin-right: 10%;
    margin-top: 5%;
  }

  .box-card {
    width: 380px;
    height: 650px;
    border-radius: 10px;
  }

  .submit-class {
    width: 100%;
  }

  .box-card .el-card__body {
    padding: 30px;
  }

</style>
