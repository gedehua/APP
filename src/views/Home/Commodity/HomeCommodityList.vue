<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品列表</span>
      <!-- 内容 -->
      <div slot="content">
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
                  <span>{{ props.row.price }}</span>
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
            <el-image :src="data.imgUrl" lazy></el-image>
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
import { list, del } from "@/api/shop";
// 引入moment
import moment from "moment";
export default {
  components: { fragment },
  data() {
    return {
      data: [],

      // 分页
      currentPage: 1,
      // 当前页条数
      pageSize: 10,
      // 总条数
      total: 0
    };
  },
  methods: {
    //获取商品列表函数
    async getList() {
      let { total, data } = await list({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 处理时间
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
      });

      // 处理图片
      // data.forEach(v => {
      //   v.imgUrl = require(`http://localhost:8080/upload/imgs/acc_img/${v.imgUrl}`);
      // });

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
    handleEdit() {
      this.$router.push("/home/commodity/list/modify");
    }
  },

  // 创建前
  created() {
    this.getList();
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
