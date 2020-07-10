<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <!-- 标题 -->
      <slot class="title" name="title" />
      <!-- 按钮 -->
      <slot name="btn" />
    </div>
    <!-- 内容 -->
    <slot name="content" />
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box-card {
  color: #808080;
  .clearfix {
    display: flex;
    justify-content: space-between;
  }
}
</style>