<template>
  <div class="home-sale-order">
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
    <div class="home-sale-order-echarts">
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ["蒸发量", "降水量", "平均温度"]
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "水量",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value} ml"
          }
        },
        {
          type: "value",
          name: "温度",
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: "{value} °C"
          }
        }
      ],
      series: [
        {
          name: "蒸发量",
          type: "bar",
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ]
        },
        {
          name: "降水量",
          type: "bar",
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]
        },
        {
          name: "平均温度",
          type: "line",
          yAxisIndex: 1,
          data: [
            2.0,
            2.2,
            3.3,
            4.5,
            6.3,
            10.2,
            20.3,
            23.4,
            23.0,
            16.5,
            12.0,
            6.2
          ]
        }
      ]
    };
  },
  // 挂载后
  mounted() {
    // 使用echarts.init()初始化dom节点
    echarts.init(this.$refs.echarts).setOption(this.option);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.home-sale-order {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 20px 0px;
  box-sizing: border-box;
}
.block {
  flex: 0 0 60px;
}
.home-sale-order-echarts {
  padding-top: 10px;
  background: #fff;
  height: 470px;
}
.echarts {
  width: 900px;
  height: 450px;
}
</style>
