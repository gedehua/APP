<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <h5 class="h5-title">外卖商家中心</h5>
          <!-- 后台首页 -->
          <router-link to="/home/index"
            ><el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">后台首页</span>
            </el-menu-item></router-link
          >
          <!-- 订单管理 -->
          <router-link to="/home/order">
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </router-link>
          <!-- 商品管理 -->
          <router-link to="/home/commodity">
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-box"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/commodity/list">
                  <el-menu-item index="3-1">商品列表</el-menu-item>
                </router-link>
                <router-link to="/home/commodity/add">
                  <el-menu-item index="3-2">商品添加</el-menu-item>
                </router-link>
                <router-link to="/home/commodity/classify">
                  <el-menu-item index="3-3">商品分类</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </router-link>
          <!-- 店铺管理 -->
          <router-link to="/home/shop">
            <el-menu-item index="4">
              <i class="el-icon-s-shop"></i>
              <span slot="title">店铺管理</span>
            </el-menu-item>
          </router-link>
          <!-- 账号管理 -->
          <router-link to="/home/acc">
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>账号管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/acc/list">
                  <el-menu-item index="5-1">账号列表</el-menu-item>
                </router-link>
                <router-link to="/home/acc/add">
                  <el-menu-item index="5-2">添加账号</el-menu-item>
                </router-link>
                <router-link to="/home/acc/modify">
                  <el-menu-item index="5-3">修改密码</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </router-link>
          <!-- 销售统计 -->
          <router-link to="/home/sale">
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-pie-chart"></i>
                <span>销售统计</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/sale/shop">
                  <el-menu-item index="6-1">商品统计</el-menu-item>
                </router-link>
                <router-link to="/home/sale/order">
                  <el-menu-item index="6-2">订单统计</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose() {},
  },
};
</script>

<style lang="less" scoped>
.tac {
  height: 100%;
}
.el-col-12 {
  width: 100%;
  height: 100%;
}
.el-menu {
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
