<template>
  <el-col :span="5">
    <div class="grid-content">
      <p class="crad-left">
        <span :class=" 'iconfont '+ data.imgUrl" :style="data.color"></span>
      </p>
      <div class="crad-right">
        <p class="text">{{ data.title }}</p>
        <p>
          <b>{{ data.dataNum | fn() }}</b>
        </p>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },

  // 过滤
  filters: {
    fn(e) {
      if (typeof e === "number") {
        let b = e + "";
        let len = b.length;
        if (len <= 3) {
          return b;
        }
        let r = len % 3;
        return r > 0
          ? b.slice(0, r) +
              "," +
              b
                .slice(r, len)
                .match(/\d{3}/g)
                .join(",")
          : b
              .slice(r, len)
              .match(/\d{3}/g)
              .join(",");
      }
    }
  }
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
    flex: 0 0 140px;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text {
      font-size: 17px;
      //   margin-bottom: 5px;
      color: #808080;
    }
    b {
      font-size: 14px;
    }
  }
}
</style>
