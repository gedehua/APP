<template>
  <div class="home-commondity-classify">
    <!-- 商品分类 -->
    <div class="home-commondity-classify-box">
      <titleP>商品分类</titleP>
      <!-- 表格 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="150"></el-table-column>
        <el-table-column property="name" label="商品名称" width="350"></el-table-column>
        <!-- 开关按钮 -->
        <el-table-column label="是否启用">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="100"
              inactive-value="0"
            ></el-switch>
          </el-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <span class="demonstration">显示总数</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage4"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
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
      value: "100",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less" scoped>
.home-commondity-classify {
  padding: 20px;
  box-sizing: border-box;
  .home-commondity-classify-box {
    width: 100%;
    background: #fff;
    // 分页
    .block {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 20px;
    }
  }
}
</style>
