<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
    <el-form ref="form" :model="form" label-position="left" label-width="80px" class="milk-form">
      <el-form-item label="奶茶名">
        <el-input v-model="form.milkName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="奶茶价格">
        <el-input v-model="form.milkPrice" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="奶茶照片">
        <el-input v-model="form.milkAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上架">
        <el-switch v-model="form.isShelf"></el-switch>
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
    name: "milk-dialog",
    props: ['dialogVisible', 'dialogTitle'],
    data: function () {
      return {
        form: {
          id: '',
          milkName: '',
          milkPrice: '',
          milkAddress: '',
          isShelf: false,
        }
      }
    },
    methods: {
      closeDialog(done) {
        this.clearForm();
        this.$emit('handleClose', done);
      },
      submitDialog() {
        let entity = this.form;
        entity.isShelf = this.form.isShelf ? 1 : 0;
        this.$http.post('/sun/milk/saveOrUpdateMilk', this.form, {emulateJSON: true}).then(response => {
          this.$message({
            message: response.body.msg,
            type: 'success'
          });
          this.closeDialog();
        }, response => {
          this.$message.error('System Error,Call Administrator');
        })
      },
      clearForm() {
        this.$refs.form.resetFields();
        this.form = {
          id: '',
          milkName: '',
          milkPrice: '',
          milkAddress: '',
          isShelf: false,
        }
      },
      editForm(row) {
        this.form.id = row.id;
        this.form.milkName = row.milkName;
        this.form.milkAddress = row.milkAddress;
        this.form.milkPrice = row.milkPrice;
        this.form.isShelf = row.isShelf === 1;
      }
    }
  }
</script>

<style scoped>
  .milk-form {
    padding: 20px;
    text-align: left;
  }
</style>
