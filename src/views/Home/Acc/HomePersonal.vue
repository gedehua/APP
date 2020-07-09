<template>
  <div class="home-acc-personal">
    <div class="home-acc-personal-box">
      <!-- titleP 插槽 组件 -->
      <titleP>管理员信息</titleP>
      <div class="home-acc-personal-box-data">
        <p>管理员ID</p>
        <p>账号</p>
        <p>用户组</p>
        <p class="time">创建时间</p>
        <div>管理员头像</div>
      </div>
    </div>
  </div>
</template>

<script>
import titleP from "@/components/Home/title.vue";
export default {
  components: {
    titleP
  }
};
</script>

<style lang="less" scoped>
.home-acc-personal {
  padding: 20px;
  box-sizing: border-box;
  .home-acc-personal-box {
    height: 400px;
    width: 100%;
    background: #fff;

    .home-acc-personal-box-data {
      padding: 0px 20px 20px;
      box-sizing: border-box;

      p {
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        &.time {
          border-bottom: 2px solid #ccc;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>