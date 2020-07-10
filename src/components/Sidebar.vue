<template>
  <div class="sidebar">
    <el-menu
      router
      unique-opened
      :default-active="curActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h5 class="h5-title">外卖商家中心</h5>
      <!-- 后台首页 -->
      <el-menu-item index="/home/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <!-- 订单管理 -->
      <el-menu-item index="/home/order/list">
        <i class="el-icon-document"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <!-- 商品管理 -->
      <el-submenu index="/home/commodity">
        <template slot="title">
          <i class="el-icon-box"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/home/commodity/list">商品列表</el-menu-item>
        <el-menu-item index="/home/commodity/add">商品添加</el-menu-item>
        <el-menu-item index="/home/commodity/classify">商品分类</el-menu-item>
      </el-submenu>
      <!-- 店铺管理 -->
      <el-menu-item index="/home/shop">
        <i class="el-icon-s-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <!-- 账号管理 -->
      <el-submenu index="/home/acc">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/home/acc/list">账号列表</el-menu-item>
        <el-menu-item index="/home/acc/add">添加账号</el-menu-item>
        <el-menu-item index="/home/acc/modify">修改密码</el-menu-item>
        <el-menu-item index="/home/acc/personal">个人中心</el-menu-item>
      </el-submenu>
      <!-- 销售统计 -->
      <el-submenu index="/home/sale">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/home/sale/shop">商品统计</el-menu-item>
        <el-menu-item index="/home/sale/order">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {},
  computed: {
    curActive() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  width: 100%;
  height: 100%;
}
.h5-title {
  text-align: center;
  margin: 20px;
  font-size: 20px;
  color: #fff;
  font-weight: normal;
}
.is-active {
  color: #409eff !important ;
}
</style>
