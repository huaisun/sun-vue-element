<template>
  <div class="pan-class">
    <div class="login-class">
      <el-card class="box-card">
        <el-form :model="form" status-icon ref="form"
                 class="demo-ruleForm">
          <el-form-item label="登陆名" prop="username">
            <el-input type="text" v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="button-form-class">
            <el-button type="primary" @click="onsubmit" class="submit-class">登陆</el-button>
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
          username: '',
          password: ''
        },
      }
    },
    methods: {
      onsubmit() {
        this.$router.push('/milk')
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
      padding: 20px;
      width: 720px;
      margin: 15% auto auto;
      border-radius: 10px;
    }

    .box-card {
      width: 480px;
      border-radius: 10px;
    }

    .pan-class {

    }

    .button-form-class {
    }

    .submit-class {
      width: 100%;
    }
  }


</style>
