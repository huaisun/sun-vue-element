<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="40%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      购物车
    </span>
      <sun-table :data="data" :label="label" :column-index="columnIndex" :column-operation="columnOperation"
                 @handlePlus="handlePlus" @handleMinus="handleMinus" @handleDelete="handleDelete"></sun-table>
      <el-form label-position="left" label-width="100px" class="dialog-form-class">
        <el-form-item label="用户">
          <el-row>
            <el-col :span="16">
              <el-select v-model="uId" filterable remote reserve-keyword placeholder="请输入关键词"
                         :remote-method="remoteMethod" :loading="loading" value="">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" class="dialog-form-button-class">
              <el-button type="warning" size="medium" plain icon="el-icon-plus">新增用户</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <label>共计：</label>
      <label class="footer-label-class">{{pay}}元</label>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button @click="clearCart">清 空</el-button>
      <el-button type="primary" @click="submitDialog">下 单</el-button>
    </span>
    </el-dialog>
    <Pay :dialog-visible="payVisible" :pay-data="payData" @handleClose="handleClose" @handleSuccessPay="handleSuccessPay"></Pay>
  </div>
</template>

<script>
  import Pay from "./Pay";

  export default {
    name: "Cart",
    components: {Pay},
    props: ['dialogVisible'],
    data: function () {
      return {
        payData: '',
        payVisible: false,
        data: [],
        label: [{
          prop: 'milkName',
          name: '奶茶名',
        }, {
          prop: 'milkGrade',
          name: '品级',
          formatter: this.gradeFormat
        }, {
          prop: 'kind',
          name: '品种',
        }, {
          prop: 'milkPrice',
          name: '单价',
        }, {
          prop: 'number',
          name: '数量',
        }],
        columnIndex: {
          show: true,
          width: 50,
          name: '#'
        },
        columnOperation: {
          show: false,
          width: 200,
        },
        options4: [],
        uId: '',
        list: [],
        loading: false,
        states: [],
        pay: 0,
      }
    },
    mounted() {
      this.loadUser();
    },
    methods: {
      handleSuccessPay(){
        this.payVisible = false;
        this.clearCart();
        this.closeDialog();
      },
      handleClose() {
        this.payVisible = false;
      },
      loadUser() {
        this.$http.get('/sun/user/getUser').then(reason => {
          this.list = reason.body.data.map(item => {
            return {value: item.value, label: item.label, name: item.name};
          });
        })
      },
      clearCart() {
        this.$http.delete('/sun/cart/deleteCart').then(reason => {
          this.loadTable();
        })
      },
      handleDelete(data) {
        let entity = {
          mId: data.id,
          kind: data.kind,
        };
        this.$http.delete('/sun/cart/deleteCart', {params: entity}).then(reason => {
          this.loadTable();
        })
      },
      loadPay() {
        let self = this;
        self.pay = 0;
        if (self.data != null && self.data.length > 0) {
          for (let i in self.data) {
            self.pay += self.data[i].number * self.data[i].milkPrice;
          }
        } else {
          self.pay = 0;
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      handlePlus(data) {
        let self = this;
        let entity = {
          mId: data.id,
          kind: data.kind,
          number: 1,
        };
        self.$http.post('/sun/cart/addCart', entity, {emulateJSON: true}).then(reason => {
          self.loadTable();
        })
      },
      handleMinus(data) {
        let self = this;
        let entity = {
          mId: data.id,
          kind: data.kind,
          number: data.number > 1 ? -1 : 0,
        };
        self.$http.post('/sun/cart/addCart', entity, {emulateJSON: true}).then(reason => {
          self.loadTable();
        });
      },
      gradeFormat(row, column, milkGrade) {
        if (milkGrade > 4.5) {
          return '极佳';
        }
        if (milkGrade > 3.5) {
          return '佳';
        }

        return '一般';
      },
      closeDialog(done) {
        this.$emit('closeDialog', done);
      },

      submitDialog() {
        //奶茶id
        let milk = [];
        for (let i in this.data) {
          let entity = {
            mid: this.data[i].id,
            number: this.data[i].number
          };
          milk.push(entity);
        }
        this.payData = {
          uId: this.uId,
          cost: this.pay,
          orderDetail: milk
        };
        this.payVisible = true;
      },

      loadTable() {
        this.$http.get('/sun/cart/getDetailCart').then(reason => {
          this.data = reason.body.data;
          this.loadPay();
        }, reason => {
          this.$message.error('System Error,Call Administrator');
        })
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

  .dialog-form-class {
    text-align: left;
    padding-top: 20px;
  }

  .dialog-form-button-class {
    text-align: right;
  }

  .dialog-form-class .el-select {
    width: 100%;
  }

  .footer-label-class {
    padding-right: 20px;
  }

</style>
