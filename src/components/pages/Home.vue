<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-row>
        <el-col :span="1">
          <i class="el-icon-house left-icon-class"></i>
        </el-col>
        <el-col :span="3">
          <span>奶茶店管理系统</span>
          <el-button type="text" icon="el-icon-sunny right-icon-class"></el-button>
        </el-col>
        <el-col :span="20" class="right-header-class">
          <el-button type="text" icon="el-icon-switch-button right-icon-class"></el-button>
          <el-button type="text" icon="el-icon-full-screen right-icon-class"></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="border-radius: 3px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router :unique-opened="true"
                 menu-trigger="hover" @select="handleSelect">
          <el-menu-item index="/milk">
            <i class="el-icon-milk-tea"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="/order_manage">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/user_manage">
            <i class="el-icon-user"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="/milk_manage">
            <i class="el-icon-news"></i>
            <span slot="title">奶茶管理</span>
          </el-menu-item>
          <el-submenu index="setting">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
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
        <el-footer class="footer-background">
          <el-row>
            <el-col :span="12" class="left-span">
              <span>Copyright © 2019 <a href="#" target="_blank">Huai Sun</a>. All rights reserved.</span>
            </el-col>
            <el-col :span="12" class="right-span">
              <span>Hand-crafted & made with
              <i class="el-icon-umbrella"></i> - More Art <a href="http://www.cssmoban.com/" target="_blank"
                                                             title="Huai Sun">Huai Sun</a></span>
            </el-col>
          </el-row>
        </el-footer>
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
    },
    methods: {
      handleSelect() {
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
    text-decoration: none;
    margin-left: 10px;
  }

  .footer-background {
    background-color: #E9EEF3;
  }

  .left-span {
    color: grey;
    font-size: 14px;
  }

  .left-span a {
    color: green;
  }

  .right-span {
    color: grey;
    font-size: 14px;
    text-align: right;
  }
</style>
