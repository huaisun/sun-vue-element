<template>
  <el-container>
    <el-card>
      <el-row>
        <el-col :span="8">
          <img src="/static/img/1.jpeg" class="image milk-photo-size" alt="short-black">
        </el-col>
        <el-col :span="16" style="padding: 18px; text-align: left;">
          <el-row>
            <label class="milk-title">鲜芋青稞牛奶</label>
          </el-row>
          <el-row>
            <label class="milk-detail">来自西藏高原、积蓄了一夏阳光的青稞</label>
          </el-row>
          <el-row>
            <el-rate v-model="rate"></el-rate>
          </el-row>
          <el-row style="width: 100%;">
            <span style="float: left">
              <label class="milk-price milk-price-small">￥</label>
              <label class="milk-price">14</label>
              <label class="milk-price-small">起</label>
            </span>
            <span style="float: right">
              <el-popover placement="right" width="300" trigger="click">
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
                    <label>常规</label>
                  </div>
                  <div>
                   <label class="milk-price milk-price-small">￥</label>
                   <label class="milk-price">14</label>
                  </div>
                  <div>
                    <el-button type="primary" size="mini">选好了，加入购物车</el-button>
                    <el-button plain size="mini" type="warning">放弃</el-button>
                  </div>
                </el-main>
                <el-button type="primary" size="mini" round style="width: 100px;" slot="reference">选规格</el-button>
              </el-popover>
            </span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </el-container>
</template>

<script>
  export default {
    name: "Milk",
    data: () => {
      return {
        rate: null,
        radio3: '常规',
      }
    },
  }
</script>

<style>
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
</style>
