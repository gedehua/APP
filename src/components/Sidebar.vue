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
      <h5 class="h5-title">
        <i class="iconfont icon-Key_system"></i> 外卖商家中心
      </h5>
      <template v-for="item in menus">
        <!-- 一级导航 -->
        <el-menu-item
          :key="item.path"
          :index="item.children && item.children.length && item.children[0].path !== ''? item.children[0].path : item.path"
          v-if="item.children && item.children.length === 1 || item.path =='/home/order'"
        >
          <i class="iconfont" :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>

        <!-- 二级导航 -->
        <el-submenu
          :index="item.path"
          :key="item.path"
          v-else-if="item.children && item.children.length > 1 || item.children.path =='/home/commodity/list'"
        >
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item
            v-for="v in item.children"
            :key="v.path"
            :index="v.path"
          >{{v.meta.title | fn}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local.js";
export default {
  data() {
    return {
      menus: []
    };
  },
  methods: {},
  created() {
    // 从本地拿取
    this.menus = local.get("menus");
  },
  computed: {
    curActive() {
      if (this.$route.path === "/home/order/edit") return "/home/order/list";
      if (this.$route.path === "/home/commodity/list/modify")
        return "/home/commodity/list";
      return this.$route.path;
    }
  },
  filters: {
    fn(a) {
      // console.log(a);
      if (a === "修改商品") {
        // a = "";
        // console.log(this.menus);
        // console.log(menus);
        console.log(a);
        // console.log(1);
        // a = "";
      }
      return a;
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

  .iconfont {
    margin: 0px;
  }
}
.is-active {
  color: #409eff !important ;
}
/deep/.iconfont {
  font-size: 20px;
  margin: 0px 12px;
  color: rgb(231, 230, 230);
}
</style>
