<template>
  <div ref="echarts" class="echarts"></div>
</template>

<script>
// echarts
import echarts from "echarts";
export default {
  props: {
    option: {
      type: Object, //类型对象
      required: true, //必填
      default: () => ({}) //默认为空对象
    }
  },
  methods: {
    //   封装一个echarts的方法
    getData(options) {
      // 准备数据
      let option = {
        //   标题
        title: {
          text: options.title
        },
        // 工具
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数据", "金额数据"]
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
        // x轴
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: options.xData
        },
        yAxis: {
          type: "value"
        },
        // 核心数据
        series: options.series
      };
      //初始化和发送渲染画布
      echarts.init(this.$refs.echarts).setOption(option);
    }
  },
  async mounted() {
    this.getData(this.option);
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        this.getData(newVal);
      },
      //   immediate: true, //刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  }
};
</script>

<style lang="less" scoped>
.echarts {
  height: 100%;
  flex: 1;
  background: #fff;
  > div {
    height: 100%;
  }
}
</style>