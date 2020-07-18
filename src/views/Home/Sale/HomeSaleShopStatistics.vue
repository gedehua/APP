<template>
  <div class="home-sale-order">
    <!-- 组件 -->
    <fragment>
      <!-- 标题 -->
      <span slot="title">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-button style="margin-left:20px" size="small" @click="submitBtn" native-type="button">查询</el-button>
      </span>
      <!-- 内容 -->
      <div slot="content">
        <barEcharts :options="options" />
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入自己封装的面板
import fragment from "@/components/Home/fragment.vue";
import barEcharts from "@/components/barEcharts.vue";
import echarts from "echarts";
// ajax
import { ordertotal } from "@/api/stat";
// moment
import moment from "moment";
export default {
  components: {
    barEcharts,
    fragment
  },
  data() {
    return {
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
      value2: "",

      // 父传子数据
      options: {}
    };
  },
  methods: {
    async getBarEcharts() {
      let { data } = await ordertotal({ date: JSON.stringify(this.value2) });
      let orderTime = data.map((v, i) =>
        moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss")
      );
      let orderAmount = data.map(v => v.orderAmount);
      this.options = {
        title: "商品统计",
        boundaryGap: false,
        orderTime: orderTime,
        legend: ["商品金额"],
        series: [
          {
            name: "商品金额",
            areaStyle: {},
            type: "line",
            data: orderAmount
          }
        ]
      };
    },
    submitBtn() {
      this.getBarEcharts();
    }
  },
  // 创建后
  async created() {
    this.getBarEcharts();
  }
};
</script>

<style lang="less" scoped>
</style>
