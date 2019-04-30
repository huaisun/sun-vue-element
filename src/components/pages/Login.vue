<template>
  <div class="pan-class">
    <el-row>
      <el-col :span="16" class="carousel-class">
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="item in itemImage" :key="item">
            <el-image style="width: 100%; height: 100%" :src="baseImage + item" fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          <el-form :model="form" status-icon ref="form"
                   class="demo-ruleForm">
            <div class="title-class">
              <i class="el-icon-s-platform title-icon-class"></i>
              <label class="title-label-class">登陆管理系统</label>
            </div>
            <el-form-item prop="username">
              <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入登陆名"
                        @keyup.enter.native="onsubmit"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"
                        @keyup.enter.native="onsubmit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-slider v-model="form.verificationCode" :show-tooltip="false" @change="clearVerification"></el-slider>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          name: '',
          password: '',
          verificationCode: 0,
        },
        itemImage: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
        baseImage: '/static/img/login/',
      }
    },
    methods: {
      clearVerification() {
        if (this.form.verificationCode < 100) {
          this.form.verificationCode = 0;
        } else {
          this.onsubmit();
        }
      },
      onsubmit() {
        let self = this;
        if (self.form.name === '' || self.form.password === '' || self.form.name.trim() === '' || self.form.password.trim() === '') {
          this.$message({
            message: '登陆名或密码不可为空',
            type: 'warning'
          });
        } else if (this.form.verificationCode < 100) {
          this.$message({
            message: '请滑动登陆',
            type: 'warning'
          });
        } else {
          self.$http.post('/sun/employ/login', self.form, {emulateJSON: true}).then((response) => {
            if (response.body.code === 1) {
              localStorage.setItem("author", response.body.data[0].name);
              this.$router.push('milk');
            } else {
              this.$message({
                message: '登陆名或密码错误或账号被禁用',
                type: 'error'
              });
            }
          });
        }
        this.form.verificationCode = 0;
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
    padding-top: 10%;
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
    width: 320px !important;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .carousel-class {
    padding: 50px;
  }

</style>
