<template>
  <div class="home-order">
    <div class="home-order-box">
      <!-- 订单号+日期 查询 -->
      <div class="home-order-title">
        <div class="home-order-title-top">
          <p>
            订单号
            <el-input
              class="home-order-title-input"
              placeholder="订单号"
              v-model="orderAs"
              size="small"
              autofocus
              clearable
            ></el-input>
          </p>
          <p>
            收货人
            <el-input
              class="home-order-title-input"
              placeholder="收货人"
              v-model="Receiving"
              size="small"
              clearable
            ></el-input>
          </p>
          <p>
            手机号
            <el-input
              class="home-order-title-input"
              placeholder="手机号"
              v-model="phone"
              size="small"
              clearable
            ></el-input>
          </p>
          <p>
            订单转态
            <el-select
              class="home-order-title-input"
              v-model="orderVul"
              size="small"
              clearable
              placeholder="订单转态"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
        </div>
        <div class="block">
          <span class="demonstration" style="margin-right:20px">选择时间</span>
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
      </div>
      <!-- 订单列表 -->
      <div class="home-order-main">
        <el-table :data="tableData" border style="width: 1200px;">
          <el-table-column fixed prop="date" label="订单号" width="120"></el-table-column>
          <el-table-column prop="name" label="下单时间" width="120"></el-table-column>
          <el-table-column prop="province" label="手机号" width="120"></el-table-column>
          <el-table-column prop="city" label="收货人" width="120"></el-table-column>
          <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="zip" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="zip" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="zip" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="zip" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="block" style="margin-top:30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 订单号
      orderAs: "",
      // 收货人
      Receiving: "",
      // 手机号
      phone: "",
      orderVul: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
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
      value2: [new Date(2020, 6, 10, 8, 40), new Date(2020, 6, 10, 9, 40)],

      // 表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],

      // 分页
      currentPage4: 4
    };
  },
  methods: {
    // 订单列表
    handleClick(row) {
      console.log(row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.home-order {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .home-order-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    .home-order-title {
      display: flex;
      flex-direction: column;
      justify-content: start;
      font-size: 14px;
      color: #808080;
      padding: 20px;
      .home-order-title-top {
        display: flex;
        margin-bottom: 20px;
        .home-order-title-input {
          width: 180px;
          margin: 0px 10px;
        }
      }
    }
  }
}
</style>
