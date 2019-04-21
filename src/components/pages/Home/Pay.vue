<template>
  <el-dialog :visible.sync="dialogVisible" width="20%" :before-close="closeDialog">
    <el-button type="primary" @click="paySuccess">支付成功</el-button>
    <el-button type="warning" @click="payFail">支付失败</el-button>
  </el-dialog>
</template>

<script>
  export default {
    name: "Pay",
    props: ['dialogVisible', 'payData'],
    methods: {
      closeDialog(done) {
        this.$emit('handleClose', done);
      },

      closeSuccess(){
        this.$emit('handleSuccessPay')
      },
      paySuccess() {
        this.payData.valid = 1;
        this.$http.post('/sun/order/addOrder', this.payData).then(reason => {
          this.$message.success('支付成功');
          this.closeSuccess();
        })
      },
      payFail() {
        this.payData.valid = 0;
        this.$http.post('/sun/order/addOrder', this.payData).then(reason => {
          this.closeDialog();
        })
      },
    }
  }
</script>

<style scoped>

</style>
