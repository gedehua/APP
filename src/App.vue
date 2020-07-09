<template>
  <div class="app">
    <!-- <login /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import login from "@/views/Login.vue";
export default {
  components: {
    login,
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
</style>
