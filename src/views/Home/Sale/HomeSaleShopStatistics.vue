<template>
  <div class="home-sale-shop">
    <div class="block">
      <span class="demonstration" style="margin-right:20px">时间范围</span>
      <el-date-picker
        v-model="value2"
        size="small"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button style="margin-left:20px" size="small" type="primary">查询</el-button>
    </div>
    <div class="home-sale-shop-echarts">
      <div ref="echarts" class="echarts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      option: {},
      // 日期数据
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: [new Date(2020, 6, 10, 8, 40), new Date(2020, 6, 10, 9, 40)]
    };
  },

  // 创建后
  created() {
    this.option = {
      title: {
        text: "堆叠区域图"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  },
  // 挂载后
  mounted() {
    echarts.init(this.$refs.echarts).setOption(this.option);
  }
};
</script>

<style lang="less" scoped>
.home-sale-shop {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 20px 0px;
  box-sizing: border-box;
}
.block {
  flex: 0 0 60px;
}
.home-sale-shop-echarts {
  padding-left: 20px;
  padding-top: 10px;
  background: #fff;
  height: 470px;
}
.echarts {
  width: 900px;
  height: 450px;
}
</style>
