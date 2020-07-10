<template>
  <div class="Content">
    <!-- 面包屑盒子 -->
    <el-row>
      <!-- 面包屑 -->
      <el-col class="left" :span="12">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="(v,i) in crumbsArr" :key="i" :to="{path:v.path}">{{v.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <!-- 个人名片 -->
      <el-col class="pirce" :span="12">
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 头像 -->

        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="block" v-for="size in sizeList" :key="size">
              <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <!-- 主要内容出口 -->
    <router-view class="box"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 面包屑数组
      crumbsArr: [],
      sizeList: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    // 下拉菜单触发事件
    handleCommand(command) {
      if (command === "a") {
        // 点击跳转到个人中心
        this.$router.push("/home/acc/personal");
      } else if (command === "b") {
        // 推出系统
        this.$message("click on item " + command);
      }
    },
    routerChange() {
      let arr = [{ title: "首页", path: "/home" }];
      // 遍历 $route.matched 这个数组
      this.$route.matched.forEach(item => {
        // 当每一项里有值 且 有title 标题时
        if (item.meta && item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          });
        }
      });
      // 赋值给 存放面包屑数组
      this.crumbsArr = arr;
    }
  },
  created() {
    //
    this.routerChange();
  },
  watch: {
    "$route.path"() {
      this.routerChange();
    }
  }
};
</script>

<style lang="less" scoped>
.Content {
  display: flex;
  flex-direction: column;
  .el-row {
    flex: 0 0 60px;
    display: flex;
    align-items: center;
    padding: 0px 70px 0px 20px;
    box-sizing: border-box;
    .pirce {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .el-col {
        width: 50px;
        margin-left: 20px;
      }
    }
  }
  .box {
    flex: 1;
    background-color: rgb(240, 242, 245);
    overflow-y: scroll;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
