<template>
  <div class="pan-class">
    <el-card class="box-card">
      <el-form :model="form" status-icon ref="form" class="demo-ruleForm">
        <el-form-item label="登陆名" prop="username">
          <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入登陆名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="button-form-class">
          <el-button type="primary" class="submit-class" @click="onsubmit">登陆</el-button>
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
  @media screen and (max-width: 1600px) {
    .pan-class {
      width: 100%;
    }

  }

  @media screen and (min-width: 1600px) {
    .submit-class {
      width: 100%;
    }

    .pan-class {
      width: 70%;
    }
  }

  .pan-class {
    margin: 0 auto;
    height: 100%;
    background-color: #C1E3FF;
  }

  .box-card {
    margin: 0 auto;
    width: 380px;
    height: 600px;
    border-radius: 10px;
  }

  .box-card .el-card__body {
    padding: 30px;
  }

</style>
