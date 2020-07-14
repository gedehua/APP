<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品列表</span>
      <!-- 内容 -->
      <div slot="content">
        <el-row type="flex" class="row-bg" justify="space-around" style="margin:10px 0px 40px">
          <el-col :span="6">
            商品名称：
            <el-input size="small" v-model="shopName" clearable style="width:200px"></el-input>
          </el-col>
          <el-col :span="6">
            商品分类：
            <el-select v-model="selectData" size="small" clearable>
              <el-option v-for="(v,i) in options" :key="i" :value="v.cateName"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button size="small" @click="inquiryBtn" type="success">查询</el-button>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table :data="data" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <span>
                    <img width="40" height="40" :src="imgBeasUrl+props.row.imgUrl" alt />
                  </span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
          <!-- 图片 -->
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img width="80" height="80" :src="imgBeasUrl+scope.row.imgUrl" alt />
            </template>
          </el-table-column>
          <el-table-column label="描述" prop="goodsDesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin:20px"
        ></el-pagination>
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入卡片模块
import fragment from "@/components/Home/fragment.vue";

// 引入ajax
import { list, del, categoriess } from "@/api/shop";
// 引入moment
import moment from "moment";
// ajax
import local from "@/utils/local";
export default {
  components: { fragment },
  data() {
    return {
      // 页面数据
      data: [],
      // 分页
      currentPage: 1,
      // 当前页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 商品名
      shopName: "",
      // 下拉框
      selectData: "",
      // 下拉框分类
      options: [],
      // 图片服务器所在的位置
      imgBeasUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/"
    };
  },
  methods: {
    //获取商品列表函数
    async getList() {
      let { total, data } = await list({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.shopName,
        category: this.selectData
      });

      // 处理时间
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
        if (v.goodsDesc.length > 15) {
          v.goodsDesc = v.goodsDesc.substr(0, 20) + ".".repeat(3);
        } else {
          v.goodsDesc = v.goodsDesc;
        }
      });
      // 渲染数据
      this.data = data;
      // 渲染条数
      this.total = total;
    },
    // 条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },

    // 删除商品
    handleDelete(id) {
      this.$confirm("是否永久删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await del({ id });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑按钮
    handleEdit(row) {
      local.set("shop", row);
      this.$router.push("/home/commodity/list/modify");
    },
    // 点击查询按钮
    inquiryBtn() {
      this.getList();
    }
  },

  // 创建前
  async created() {
    this.getList();
    // 渲染分类列表
    let { categories } = await categoriess();
    this.options = categories;
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

// 弹出框样式
.el-message-box__content {
  display: flex;
  flex-direction: row;
}

// 图片
.el-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
</style>
