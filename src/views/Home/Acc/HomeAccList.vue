<template>
  <div class="home-acc-list">
    <div class="home-acc-list-box">
      <!-- 插槽组件 -->
      <titleP>账户列表</titleP>
      <!-- 表格 -->
      <div class="tabel">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 复选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 账户 -->
          <el-table-column label="账户" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="name" label="用户组" width="120"></el-table-column>
          <!-- 创建时间 -->
          <el-table-column prop="address" label="创建时间" show-overflow-tooltip></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
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
      <!-- 按钮 -->
      <div class="btn">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import titleP from "@/components/Home/title.vue";
export default {
  components: {
    titleP
  },
  data() {
    return {
      // 表格
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],

      // 分页
      currentPage4: 4
    };
  },

  methods: {
    // 表格
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
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
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
    //
  }
};
</script>

<style lang="less" scoped>
.home-acc-list {
  padding: 20px;
  box-sizing: border-box;
  .home-acc-list-box {
    width: 100%;
    background: #fff;
    // 表格
    .tabel {
      padding: 0px 20px 30px 30px;
      box-sizing: border-box;
    }
    // 分页
    .block {
      margin-left: 30px;
      margin-bottom: 20px;
    }
    // 按钮
    .btn {
      margin-left: 30px;
      padding-bottom: 20px;
    }
  }
}
</style>
