<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-row>
        <el-col :span="1">
          <i class="el-icon-menu" style="color: #921AFF; font-size: 24px;"></i>
        </el-col>
        <el-col :span="3">
          <span>微笑 - 奶茶店</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="border-radius: 3px">
        <el-menu :default-active="active_index" class="el-menu-vertical-demo" router @select="selectMenu">
          <el-menu-item index="milk">
            <i class="el-icon-loading"></i>
            <span slot="title">商品</span>
          </el-menu-item>
          <el-menu-item index="order_management">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-more-outline"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-news"></i>
            <span slot="title">奶茶管理</span>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">登录管理</el-menu-item>
              <el-menu-item index="1-2">店铺详情</el-menu-item>
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
      return {
        //激活的菜单
        active_index: '',
      }
    },

    methods: {
      selectMenu(index) {
        this.active_index = index;
      }
    },
    created: () => {
    }
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
</style>
