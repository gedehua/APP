<template>
  <div class="home-index">
    <div class="nav-title">
      <el-row type="flex" justify="space-around">
        <!-- Crad 组件 -->
        <Crad v-for="(item, i) in navTitleData" :key="i" :data="item" />
      </el-row>
    </div>

    <div ref="echarts" class="echarts"></div>
  </div>
</template>

<script>
// 引入卡片
import Crad from "@/components/Home/crad.vue";
// echarts
import echarts from "echarts";
// ajax
import { totaldata } from "@/api/stat";
export default {
  components: {
    Crad
  },
  data() {
    return {
      // echarts

      // nav-title 数据
      navTitleData: [
        { imgUrl: "el-icon-document", title: "总订单", dataNum: 21321313 },
        { imgUrl: "el-icon-coin", title: "总销售额", dataNum: 21321313 },
        { imgUrl: "el-icon-s-claim", title: "今日订单数", dataNum: 21321313 },
        { imgUrl: "el-icon-bangzhu", title: "今日销售额", dataNum: 21321313 }
      ],

      FormData: {}
    };
  },
  async created() {
    // 发送ajax
    let a = await totaldata();
    let b = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["订单数据", "金额数据"]
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["2019/11/17", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };
    this.FormData.series = [
      {
        name: "订单数据",
        type: "line",
        stack: "总量",
        data: this.FormData.orderData
      },
      {
        name: "金额数据",
        type: "line",
        stack: "总量",
        data: this.FormData.amountData
      }
    ];

    this.FormData = b;
    // this.FormData.xAxis.data = this.FormData.xData;
  },
  mounted() {
    // 使用 echarts.init( 'vue的dom节点' )   实例化 dom节点
    echarts.init(this.$refs.echarts).setOption(this.FormData);
  },
  watch: {
    // "option.xAxis.data": {
    //   handler(newName, oldName) {
    //     // this.oldName = this.newName;
    //     // console.log(this.option.xAxis.data);
    //     this.option.xAxis.data = newName;
    //     console.log(this.option.xAxis.data);
    //     console.log(newName, oldName);
    //   },
    //   // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
    //   immediate: true,
    //   deep: true
    // }
    // series: {
    //   handler(newName, oldName) {
    //     console.log(newName, oldName);
    //     this.option.series.oldName = this.option.series.newName;
    //     console.log(1);
    //   },
    //   // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
    //   immediate: true,
    //   deep: true
    // }
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
    > div {
      height: 100%;
    }
  }
}
</style>
