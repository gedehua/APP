<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">订单详情</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form
          :model="orderForm"
          :rules="rules"
          ref="orderForm"
          label-width="100px"
          style="width:400px"
        >
          <!-- 订单ID
          <el-form-item label="店铺ID" prop="id">
            <el-input disabled v-model="orderForm.id" clearable></el-input>
          </el-form-item>-->

          <!-- 订单号 -->
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="orderForm.orderNo" clearable></el-input>
          </el-form-item>

          <!-- 下单时间 -->
          <el-form-item label="下单时间" prop="orderTime">
            <el-date-picker v-model="orderForm.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>

          <!-- 联系电话 -->
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="orderForm.phone" clearable></el-input>
          </el-form-item>

          <!-- 收货人 -->
          <el-form-item label="收货人" prop="consignee">
            <el-input v-model="orderForm.consignee" clearable></el-input>
          </el-form-item>

          <!-- 送货地址 -->
          <el-form-item label="送货地址" prop="deliverAddress">
            <el-input v-model="orderForm.deliverAddress" clearable></el-input>
          </el-form-item>

          <!-- 送达时间 -->
          <el-form-item label="送达时间" prop="deliveryTime">
            <el-date-picker v-model="orderForm.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" :rows="3" v-model="orderForm.remarks" clearable></el-input>
          </el-form-item>
          <!-- 订单金额 -->
          <el-form-item label="订单金额" prop="orderAmount">
            <el-input-number v-model="orderForm.orderAmount" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item label="订单状态" prop="orderState">
            <el-select v-model="orderForm.orderState" clearable>
              <el-option value="已受理">已受理</el-option>
              <el-option value="派送中">派送中</el-option>
              <el-option value="已完成">已完成</el-option>
            </el-select>
          </el-form-item>

          <!-- 按钮组 -->
          <el-form-item>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                plain
                @click="handleEdit(scope.$index, scope.row)"
              >提交</el-button>
              <el-button size="mini" type="info" plain @click="handleDelete">重置</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </fragment>
  </div>
</template>

<script>
// ajax
import { edit } from "@/api/order";
// local
import local from "@/utils/local";
import fragment from "@/components/Home/fragment.vue";
export default {
  components: { fragment },

  data() {
    return {
      orderForm: {},
      // 图片服务器所在的位置
      imgBeasUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      // 内置验证规则
      rules: {
        name: { required: true, message: "请输入商品名称", trigger: "blur" },
        category: {
          required: true,
          message: "请选择商品分类",
          trigger: "change"
        },
        price: { required: true, message: "请输入商品价格", trigger: "change" },
        imgUrl: { required: true, message: "请上传图片", trigger: "blur" },
        goodsDesc: {
          required: true,
          message: "请输入商品描述",
          trigger: "blur"
        }
      }
    };
  },

  methods: {
    //  提交
    async handleEdit() {
      let { code } = await edit({
        id: this.orderForm.id, //要修改账号的id
        orderNo: this.orderForm.orderNo, //订单号
        orderTime:
          this.orderForm.orderTime === null
            ? JSON.stringify("")
            : this.orderForm.orderTime, //下单时间
        phone: this.orderForm.phone, //电话
        consignee: this.orderForm.consignee, //收货人
        deliverAddress: this.orderForm.deliverAddress, //送货地址
        deliveryTime:
          this.orderForm.deliveryTime === null
            ? JSON.stringify("")
            : this.orderForm.deliveryTime, //送达时间
        remarks: this.orderForm.remarks, //备注
        orderAmount: this.orderForm.orderAmount, //订单金额
        orderState: this.orderForm.orderState //订单状态
      });

      if (code === 0) {
        // 清楚本地
        local.remove("row");
        // 跳页面
        this.$router.push("/home/order/list");
      }
    },
    // 重置
    handleDelete() {
      // 重置表单
      // 清空本地
      this.$refs.orderForm.resetFields();
      this.orderForm = local.remove("shop");
    }
  },

  created() {
    // console.log(this.$route.query);   //query 路由传参  query 传递的参数会在地址栏显示出来  不适合多数据的传递
    // console.log(this.$route.params); //params 路由传参   params 传递参数 不会在地址栏显示，需要在路由里设置name值 不能刷新  刷新后数据 清零

    // 取数据
    this.orderForm = local.get("row");
    if (this.orderForm.orderTime === "Invalid date") {
      this.orderForm.orderTime = "";
    }
    if (this.orderForm.deliveryTime === "Invalid date") {
      this.orderForm.deliveryTime = "";
    }
  }
};
</script>

<style lang="less" scoped>
// 上传头像
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 40px 0px 0px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>