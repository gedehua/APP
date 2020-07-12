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
              placeholder="订单状态"
              @change="aaa"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </p>
        </div>
        <div class="block">
          <span class="demonstration" style="margin-right:20px">选择时间</span>
          <el-date-picker
            v-model="time"
            size="small"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
          <el-button style="margin-left:20px" @click="queryOrder" size="small" type="primary">查询</el-button>
        </div>
      </div>
      <!-- 订单列表 -->
      <div class="home-order-main">
        <el-table :data="tableData" border>
          <el-table-column fixed prop="orderNo" label="订单号" width="120"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
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
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 详情 -->
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form" label-width="100px" size="small" style="width:400px">
          <el-form-item label="订单id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="form.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-input v-model="form.orderTime"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="form.consignee"></el-input>
          </el-form-item>
          <el-form-item label="送货地址">
            <el-input v-model="form.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间">
            <el-input v-model="form.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input v-model="form.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-input v-model="form.orderState"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// ajax
import { list, search, detail } from "@/api/order";
// moment
import moment from "moment";
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
      options: [{ label: "已完成" }, { label: "已受理" }, { label: "派送中" }],
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
      time: [],

      // 表格数据
      tableData: [],

      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,

      // 订单状态
      orderState: "",

      // 订单详情
      dialogFormVisible: false,
      form: []
    };
  },
  methods: {
    // 获取订单
    async getList() {
      let { total, data } = await list({
        currentPage: this.currentPage, //页码
        pageSize: this.pageSize, //条数
        orderNo: this.orderAs, //订单号
        consignee: this.Receiving, //收货人
        phone: this.phone, //电话
        orderState: "", //订单状态
        date: "" //日期
      });
      // 处理时间
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });

      this.tableData = data;
      this.total = total;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },

    // 查询订单
    async queryOrder() {
      let { total, data } = await search({
        currentPage: this.currentPage, //页码
        pageSize: this.pageSize, //条数
        orderNo: this.orderAs, //订单号
        consignee: this.Receiving, //收货人
        phone: this.phone, //电话
        orderState: this.orderState, //订单状态
        date: JSON.stringify(this.time) //日期
      });
      // 处理时间
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 渲染数据
      this.tableData = data;
      this.total = total;
    },
    // 处理订单状态
    aaa(val) {
      this.orderState = val;
    },
    // 查看订单详情
    async handleClick(id) {
      // ajax
      let { data } = await detail({ id });
      // 数据赋值
      this.form = data;
      // 弹出蒙层
      this.dialogFormVisible = true;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.home-order {
  display: flex;
  height: 100%;
  width: 100%;
  padding-bottom: 40px;
  .home-order-box {
    height: 100%;
    display: flex;
    width: 1400px;
    flex-direction: column;
    background: #fff;
    padding-bottom: 30px;
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
    .home-order-main {
      flex: 1;
    }
  }
}
</style>
