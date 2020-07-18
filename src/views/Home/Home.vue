<template>
  <div class="home">
    <!-- 侧边栏 -->
    <Sidebar class="sidebar" />
    <!-- 内容 -->
    <Content class="content" />
  </div>
</template>

<script>
// 侧边栏
import Sidebar from "@/components/Sidebar.vue";
// 内容
import Content from "@/components/Content.vue";
export default {
  components: {
    Sidebar,
    Content
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100%;
  .sidebar {
    flex: 0 0 240px;
    height: 100%;
  }
  .content {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
