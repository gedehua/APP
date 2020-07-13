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
      option: {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
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
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },

      // nav-title 数据
      navTitleData: [
        { imgUrl: "el-icon-document", title: "总订单", dataNum: 21321313 },
        { imgUrl: "el-icon-coin", title: "总销售额", dataNum: 21321313 },
        { imgUrl: "el-icon-s-claim", title: "今日订单数", dataNum: 21321313 },
        { imgUrl: "el-icon-bangzhu", title: "今日销售额", dataNum: 21321313 }
      ]
    };
  },
  methods: {
    async a() {
      let b = await totaldata();
      this.option.xAxis.data = b.xData;
      // console.log(this.option.xAxis);
      // console.log(this.option.xAxis.data);
      // console.log(b.xData);
    }
  },
  created() {
    // 发送ajax
    this.a();
  },
  mounted() {
    // 使用 echarts.init( 'vue的dom节点' )   实例化 dom节点
    echarts.init(this.$refs.echarts).setOption(this.option);
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
