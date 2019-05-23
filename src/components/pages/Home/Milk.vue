<template>
  <el-container>
    <el-row style="width: 100%;">
      <el-col :span="spliceCard" v-for="(item, index) in milkData" :key="index">
        <el-card style="width: 400px; margin-bottom: 20px;">
          <el-row>
            <el-col :span="8">
              <img :src="item.milkPhoto ? baseImgUrl + item.milkPhoto: defaultImg" class="image milk-photo-size"
                   alt="short-black">
            </el-col>
            <el-col :span="16" style="padding: 18px; text-align: left;">
              <el-row>
                <label class="milk-title">{{item.milkName}}</label>
              </el-row>
              <el-row>
                <el-tooltip class="item" effect="dark" :content="item.milkDetail" placement="top">
                  <label class="milk-detail">{{item.milkDetail.substring(0, 14)}}。。。</label>
                </el-tooltip>
              </el-row>
              <el-row>
                <el-rate v-model="item.milkGrade" disabled></el-rate>
              </el-row>
              <el-row style="width: 100%;">
                <span style="float: left">
                  <label class="milk-price milk-price-small">$</label>
                  <label class="milk-price">{{item.milkPrice}}</label>
                </span>
                <span style="float: right">
                  <el-popover placement="right" width="300" trigger="click" @hide="closePop">
                    <el-main>
                      <p>规格</p>
                      <div>
                        <el-radio-group v-model="radio3">
                          <el-radio-button label="常规"></el-radio-button>
                          <el-radio-button label="珍珠"></el-radio-button>
                          <el-radio-button label="红豆"></el-radio-button>
                          <el-radio-button label="布丁"></el-radio-button>
                        </el-radio-group>
                      </div>
                      <div>
                        <label>已选:</label>
                        <label>{{radio3}}</label>
                      </div>
                      <div>
                       <label class="milk-price milk-price-small">￥</label>
                       <label class="milk-price">{{item.milkPrice}}</label>
                      </div>
                      <div class="select-submit-class">
                        <el-button type="primary" size="mini" @click="addCart(item)">选好了，加入购物车</el-button>
                      </div>
                    </el-main>
                    <el-button type="primary" size="mini" round style="width: 100px;" slot="reference">选规格</el-button>
                  </el-popover>
                </span>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <Cart ref="Cart" :dialog-visible="dialogVisible" @closeDialog="handleClose"></Cart>
  </el-container>
</template>

<script>
  import Cart from "./Cart";

  export default {
    name: "Milk",
    components: {Cart},
    data: function () {
      return {
        screenWidth: document.documentElement.clientWidth,
        spliceCard: 6,
        radio3: '常规',
        milkData: [],
        baseImgUrl: '/static/img/milk/',
        defaultImg: '/static/img/milk/default.jpg',
        dialogVisible: false
      }
    },
    created() {
      this.loadMilkData();
      this.loadCart();
      this.changeWindow();
    },
    mounted() {
      this.screenWidth = `${document.documentElement.clientWidth}`;
      // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
      const that = this;
      window.onresize = function temp() {
        that.screenWidth = `${document.documentElement.clientWidth}`;
        that.changeWindow();
      };
    },
    methods: {
      changeWindow() {
        if(this.screenWidth > 1900) {
          this.spliceCard = 6;
        }
        if(this.screenWidth > 1400 && this.screenWidth < 1900) {
          this.spliceCard = 8;
        }
        if(this.screenWidth < 1400) {
          this.spliceCard = 12;
        }
      },
      closePop() {
        this.radio3 = '常规';
      },
      //加载
      loadMilkData() {
        let self = this;
        self.$http.get('/sun/milk/getMilkMenu').then(reason => {
          self.milkData = reason.body.data;
        });
      },
      addCart(data) {
        let self = this;
        let entity = {
          mId: data.id,
          kind: self.radio3,
          number: 1
        };
        self.$http.post('/sun/cart/addCart', entity, {emulateJSON: true}).then(reason => {
          if (reason.body.code === 1) {
            this.$message({
              message: reason.body.msg,
              type: 'success'
            });
          } else {
            this.$message.error(reason.body.msg);
          }
          this.loadCart();
        }, reason => {
          this.$message.error('System Error,Call Administrator');
        })
      },
      loadCart() {
        this.$notify.closeAll();
        this.$http.get('/sun/cart/getCart').then(reason => {
          if (reason.body.data > 0) {
            this.$notify({
              title: '购物车',
              message: '已添加 ' + reason.body.data + ' 个物品 ---- 点击前往购物车',
              position: 'bottom-right',
              offset: 100,
              duration: 0,
              showClose: false,
              onClick: this.goCart,
            });
          }
        });
      },
      goCart() {
        this.$refs.Cart.loadTable();
        this.dialogVisible = true;
      },

      handleClose() {
        this.dialogVisible = false;
        this.loadCart();
      }
    },
    destroyed() {
      this.$notify.closeAll();
    }
  }
</script>

<style>
  .select-submit-class {
    text-align: right;
  }

  .milk-price {
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: red;
  }

  .milk-price-small {
    font-size: 12px;
  }

  .milk-detail {
    line-height: 30px;
    font-size: 12px;
  }

  .milk-title {
    line-height: 14px;
    font-weight: bold;
  }

  .el-card__body {
    padding: 3px;
    width: 400px;
    line-height: 0;
  }

  .el-card {
    margin-right: 20px;
  }

  .milk-photo-size {
    height: 8rem;
  }

  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border-radius: 10px;
    padding: 5px;
    height: 25px;
  }

  .el-radio-button:first-child .el-radio-button__inner, .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 10px;
    padding: 5px;
    height: 25px;
  }

  .el-radio-button__inner {
    border-radius: 10px;
    padding: 5px;
    height: 25px;
    width: 70px;
    margin: 5px 0;
  }
  .el-tooltip__popper {
    width: 300px;
  }
</style>
