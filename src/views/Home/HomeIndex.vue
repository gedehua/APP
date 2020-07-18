<template>
  <div class="home-index">
    <div class="nav-title">
      <el-row type="flex" justify="space-around">
        <!-- Crad 组件 -->
        <Crad v-for="(item, i) in navTitleData" :key="i" :data="item" />
      </el-row>
    </div>

    <!-- <div ref="echarts" class="echarts"></div> -->
    <Echarts :option="options" />
  </div>
</template>

<script>
// 引入卡片
import Crad from "@/components/Home/crad.vue";
import Echarts from "@/components/Echarts.vue";
// echarts
import echarts from "echarts";
// ajax
import { totaldata } from "@/api/stat";
export default {
  components: {
    Crad,
    Echarts
  },
  data() {
    return {
      // echarts
      options: {},
      // nav-title 数据
      navTitleData: [
        {
          imgUrl: "icon-dingdan1",
          title: "总订单",
          dataNum: 21321313,
          color: { color: "rgb(255, 148, 62)" }
        },

        {
          imgUrl: "icon-qian",
          title: "总销售额",
          dataNum: 21321313,
          color: { color: "rgb(255,201,99)" }
        },
        {
          imgUrl: "icon-dingdan",
          title: "今日订单数",
          dataNum: 21321313,
          color: { color: "rgb(36,170,125)" }
        },
        {
          imgUrl: "icon-qian4",
          title: "今日销售额",
          dataNum: 21321313,
          color: { color: "rgb(255,106,72)" }
        }
      ]
    };
  },
  async mounted() {
    let {
      // 订单数据
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount,
      // echarts 数据
      amountData,
      orderData,
      xData
    } = await totaldata();

    // 渲染头部卡片
    let arr = [totalOrder, totalAmount, todayOrder, totayAmount];

    this.navTitleData.forEach((v, i) => (v.dataNum = arr[i]));

    this.options = {
      title: "数据",
      xData,
      series: [
        {
          name: "订单数据",
          type: "line",
          data: orderData
        },
        {
          name: "金额数据",
          type: "line",
          data: amountData
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.home-index {
  display: flex;
  flex-direction: column;

  .nav-title {
    .el-row {
      &:last-child {
        margin-bottom: 20px;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .grid-content {
      margin-top: 20px;
      background: #fff;
      border-radius: 4px;
      min-height: 80px;
    }
  }
  .echarts {
    height: 100%;
    flex: 1;
    background: #fff;
    > div {
      height: 100%;
    }
  }
}
</style>
