<template>
  <div>
    <!-- 商品分类 -->
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品分类</span>
      <!-- 按钮 -->
      <el-button size="small" type="primary" slot="btn">添加分类</el-button>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表格 -->
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="150"></el-table-column>
          <el-table-column property="name" ref="shopName" label="商品名称" width="350"></el-table-column>
          <!-- 开关按钮 -->
          <el-table-column label="是否启用">
            <el-tooltip slot-scope="scope" :content="'Switch value: ' + value" placement="top">
              <el-switch
                v-model="scope.row.switch"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-tooltip>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage4"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
          style="margin:20px"
        ></el-pagination>
      </div>
    </fragment>
  </div>
</template>

<script>
import fragment from "@/components/Home/fragment.vue";
export default {
  components: { fragment },
  data() {
    return {
      value: true,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 1
        }
      ],
      currentRow: null,
      currentPage4: 0
    };
  },
  methods: {
    // 路由
    handleSizeChange() {},
    handleCurrentChange() {},
    // 编辑
    handleEdit(index, row) {
      this.$alert(
        `商品分类：<input/><el-input v-model="input" placeholder="请输入内容"></el-input> <br/>是否启用：<el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch> `,
        "HTML 片段",
        {
          dangerouslyUseHTMLString: true
        }
      );
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm("是否永久删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
