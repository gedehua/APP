<template>
  <div ref="echarts" class="echarts"></div>
</template>

<script>
// echarts
import echarts from "echarts";
export default {
  // 接受父传子的数据
  props: {
    options: {
      type: Object, //传过来的格式是对象
      require: true, //必填
      default: () => ({}) //默认是一个空对象
    }
  },

  methods: {
    // 封装一个barEcharts的方法
    getBarEcharts(options) {
      //   准备数据
      let option = {
        //   标题
        title: {
          text: options.title
        },

        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "cross",
        //     label: {
        //       backgroundColor: "#6a7985"
        //     }
        //   }
        // },
        // 工具
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: options.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        // x轴
        xAxis: {
          type: "category",
          boundaryGap: options.boundaryGap,
          data: options.orderTime,
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: "value"
        },
        // 核心数据
        series: options.series
      };

      // 初始化
      echarts.init(this.$refs.echarts).setOption(option);
    }
  },

  mounted() {
    this.getBarEcharts(this.options);
  },

  watch: {
    options: {
      handler(newVal, oldVal) {
        this.getBarEcharts(newVal);
      },
      //   immediate: true, //刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  }
};
</script>

<style lang="less" scoped>
.echarts {
  height: 500px;
  flex: 1;
  background: #fff;
}
</style>