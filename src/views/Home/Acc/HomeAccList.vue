<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">账户列表</span>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          highlight-current-row
          lazy
        >
          <!-- 复选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 账户 -->
          <el-table-column label="账户" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <!-- 用户组 -->
          <el-table-column
            prop="name"
            label="用户组"
            width="120"
          ></el-table-column>
          <!-- 创建时间 -->
          <el-table-column
            prop="address"
            label="创建时间"
            show-overflow-tooltip
          ></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" @click="handleDelete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          style="margin:20px"
        ></el-pagination>
        <!-- 按钮 -->
        <div class="btn">
          <el-button size="small" type="danger">批量删除</el-button>
          <el-button size="small" type="primary">取消选择</el-button>
        </div>
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
      // 表格
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],

      // 当前页码
      currentPage: 4,
      // 每页显示的条数
      pageSize: "",
    };
  },

  methods: {
    // 表格
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 操作
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("是否永久删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 发送ajax
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //
  },
};
</script>

<style lang="less" scoped></style>
