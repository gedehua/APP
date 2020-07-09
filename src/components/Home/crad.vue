<template>
  <el-col :span="5"
    ><div class="grid-content ">
      <p class="crad-left">
        <span :class="data.imgUrl"></span>
      </p>
      <div class="crad-right">
        <p class="text">{{ data.title }}</p>
        <p>
          <b>{{ data.dataNum }}</b>
        </p>
      </div>
    </div></el-col
  >
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.grid-content {
  margin-top: 20px;
  background: #fff;
  border-radius: 4px;
  min-height: 80px;

  display: flex;
  .crad-left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: inline-block;
      font-size: 50px;
      color: rgb(20, 95, 207);
    }
  }
  .crad-right {
    flex: 0 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text {
      font-size: 17px;
      //   margin-bottom: 5px;
      color: #ccc;
    }
    b {
      font-size: 14px;
    }
  }
}
</style>
