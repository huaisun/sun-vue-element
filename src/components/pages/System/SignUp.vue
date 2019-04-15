<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
    <el-form ref="form" label-position="left" :model="form" label-width="80px" class="user-form">
      <el-form-item label="姓名">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input type="text" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="text" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="启用">
        <el-switch v-model="form.valid"></el-switch>
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
    name: "sign-up",
    props: ['dialogVisible', 'dialogTitle',],
    data: function () {
      return {
        form: {
          id: '',
          name: '',
          password: '',
          phone: '',
          email: '',
          address: '',
          valid: false,
        }
      }
    },
    methods: {
      //关闭弹出框
      closeDialog(done) {
        this.$emit('handleClose', done);
        this.clearForm();
      },
      //提交form
      submitDialog() {
        let self = this;
        let entity = self.form;
        entity.valid = self.form.valid ? 1 : 0;
        self.$http.post('/sun/employ/saveOrUpdateEmploy', entity, {emulateJSON: true}).then(response => {
          self.$message({
            message: response.body.msg,
            type: 'success'
          });
          self.closeDialog();
        }, response => {
          self.$message.error('System Error,Call Administrator');
        })
      },
      //清空form
      clearForm() {
        this.$refs['form'].resetFields();
        this.form = {
          name: '',
          password: '',
          phone: '',
          email: '',
          address: '',
          valid: false,
        }
      },

      editForm(row) {
        this.form.id = row.id;
        this.form.name = row.name;
        this.form.password = row.password;
        this.form.address = row.address;
        this.form.phone = row.phone;
        this.form.email = row.email;
        this.form.valid = row.valid === 1;
      }
    }
  }
</script>

<style>

  .user-form {
    padding: 20px;
    text-align: left;
  }

  .el-dialog__header {
    text-align: left;
    background: #E9EEF3;
  }
</style>
