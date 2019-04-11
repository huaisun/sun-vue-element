<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
    <el-form :model="form" label-position="left" label-width="80px" class="user-form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitDialog">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  export default {
    name: "user-dialog",
    props: ['dialogTitle', 'dialogVisible'],
    data: function () {
      return {
        form: {
          id: '',
          name: '',
          phone: '',
          email: ''
        }
      }
    },
    methods: {
      //关闭弹出框
      closeDialog(done) {
        this.$emit('handleClose', done);
      },

      //保存操作
      submitDialog() {
        console.log(this.form);
        /*this.$http.post('/sun/user/saveOrUpdateUser', this.form).then(response => {
          console.log(response);
        }, response => {

        })*/
      },

      editForm(data) {
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.phone = data.phone;
        this.form.email = data.email;
      }
    }
  }
</script>

<style>
  .el-dialog__header {
    text-align: left;
    background: #E9EEF3;
  }

  .user-form {
    padding: 20px;
  }

  .dialog-title {
  }
</style>
