<template>
  <div class="Content">
    <h2>内容</h2>
    <router-view class="box"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.Content {
  display: flex;
  flex-direction: column;
  h2 {
    flex: 0 0 60px;
  }
  .box {
    flex: 1;
    background-color: rgb(240, 242, 245);
    overflow-y: scroll;
  }
}
</style>
