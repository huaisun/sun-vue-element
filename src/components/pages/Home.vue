<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-row>
        <el-col :span="1">
          <i class="el-icon-menu left-icon-class"></i>
        </el-col>
        <el-col :span="3">
          <span>微笑 - 奶茶店</span>
        </el-col>
        <el-col :span="20" class="right-header-class">
          <a href="https://github.com/huaisun/sun-vue-element" target="_blank"
             class="el-icon-star-off right-icon-class"></a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="border-radius: 3px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router :unique-opened="true"
                 menu-trigger="hover" @select="handleSelect">
          <el-menu-item index="/milk">
            <i class="el-icon-loading"></i>
            <span slot="title">商品</span>
          </el-menu-item>
          <el-menu-item index="/order_manage">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/user_manage">
            <i class="el-icon-more-outline"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="/milk_manage">
            <i class="el-icon-news"></i>
            <span slot="title">奶茶管理</span>
          </el-menu-item>
          <el-submenu index="setting">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/login_manage">登录管理</el-menu-item>
              <el-menu-item index="/shop_detail">店铺详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data: () => {
      return {}
    },
    created() {
      console.log(this.$route)
    },
    methods: {
      handleSelect() {
        console.log(this.$route);
      },
      hover_icon() {
        alert(11)
      }
    },
  }
</script>
<style>
  .el-header, .el-footer {
    color: #333;
    line-height: 60px;
    text-align: left;
  }

  .el-aside {
    color: #333;
    line-height: 200px;
    text-align: left;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .right-header-class {
    text-align: right;
    padding-right: 10px;
  }

  .left-icon-class {
    color: #921AFF;
    font-size: 24px;
  }

  .right-icon-class {
    color: #921AFF;
    font-size: 20px;
  }

  .right-icon-class:hover {
    background: #921AFF;
    border-radius: 50%;
    color: white;
  }
</style>
