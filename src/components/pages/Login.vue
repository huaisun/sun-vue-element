<template>
  <div class="pan-class">
    <div class="login-class">
      <el-card class="box-card">
        <el-form :model="form" status-icon ref="form"
                 class="demo-ruleForm">
          <el-form-item label="登陆名" prop="username">
            <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入登陆名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="button-form-class">
            <el-button type="primary" @click="onsubmit()" class="submit-class">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data: () => {
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
          self.$http.post('/sun/employ/login', self.form).then((response) => {
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
  @media screen and (max-width: 376px) {
    .login-class {
      background: #E9EEF3;
      height: 100%;
    }

    .submit-class {
      width: 100%;
    }

    .box-card {
      height: 100%;
    }

    .pan-class {
      height: 100%;
    }
  }

  @media screen and (min-width: 376px) {
    .login-class {
      background: #E9EEF3;
      width: 480px;
      margin: auto auto;
      border-radius: 10px;
    }

    .box-card {
      width: 480px;
      border-radius: 10px;
    }

    .button-form-class {
    }

    .submit-class {
      width: 100%;
    }
  }

  .box-card .el-card__body {
    padding: 30px;
  }

</style>
