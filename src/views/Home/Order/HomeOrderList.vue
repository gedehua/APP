<template>
  <div class="home-order">
    <div class="home-order-box">
      <!-- 订单号+日期 查询 -->
      <el-form
        :inline="true"
        ref="form"
        v-model="query"
        label-width="100px"
        style="margin:30px 0px 10px"
        size="small"
      >
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input v-model="query.orderAs" clearable style="width:200px"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="收货人">
          <el-input v-model="query.Receiving" clearable style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="query.phone" clearable style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="订单转态">
          <el-select v-model="query.orderVul" clearable placeholder="订单状态">
            <el-option value="已受理">已受理</el-option>
            <el-option value="派送中">派送中</el-option>
            <el-option value="已完成">已完成</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="query.time"
            size="small"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:20px" @click="queryOrder" size="small" type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 订单列表 -->
      <el-table :data="tableData" border style="width: 100%" height="250">
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
            <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top:20px"
      ></el-pagination>

      <!-- 订单详情 -->
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="40%">
        <el-form disabled :model="form" label-width="100px" size="small" style="width:400px">
          <el-form-item label="订单id">
            <el-input v-model="form.id"></el-input>
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
// local
import local from "@/utils/local";
// moment
import moment from "moment";
export default {
  data() {
    return {
      query: {
        // 订单号
        orderAs: "",
        // 收货人
        Receiving: "",
        // 手机号
        phone: "",
        orderVul: "",
        time: ""
      },
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

      // 表格数据
      tableData: [],

      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,

      // 订单详情
      dialogFormVisible: false,
      form: []
    };
  },
  methods: {
    // 获取订单
    async getList() {
      let { total, data } = await search({
        currentPage: this.currentPage, //页码
        pageSize: this.pageSize, //条数
        orderNo: this.query.orderAs, //订单号
        consignee: this.query.Receiving, //收货人
        phone: this.query.phone, //电话
        orderState: this.query.orderVul, //订单状态
        date:
          this.query.time === null
            ? JSON.stringify("")
            : JSON.stringify(this.query.time) //日期
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

    // 查询按钮订单
    async queryOrder() {
      this.getList();
    },
    // 查看订单详情
    async handleClick(id) {
      // ajax
      let { data } = await detail({ id });
      // 数据赋值
      this.form = data;
      // 弹出蒙层
      this.dialogFormVisible = true;
    },
    // 编辑
    change(row) {
      // 路由传参
      // this.$router.push({
      //   path: "/home/order/edit",
      //   query: {
      //     id: row.id
      //   }
      // });
      // this.$router.push({
      //   name: "orderEdit",
      //   params: {
      //     id: row.id
      //   }
      // });

      // 将数据存到本地
      local.set("row", row);
      this.$router.push("/home/order/edit");
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
  }
}
</style>
