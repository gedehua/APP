<template>
  <div>
    <!-- 商品分类 -->
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品分类</span>
      <!-- 按钮 -->
      <el-button size="small" type="primary" slot="btn" @click="addClassify">添加分类</el-button>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表格 -->
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column label="序号" type="index" width="150" prop="id"></el-table-column>
          <el-table-column ref="shopName" label="分类名称" width="350">
            <template slot-scope="scope">
              <span v-if="!scope.row.isflag">{{scope.row.cateName}}</span>
              <el-input v-else v-model="scope.row.cateName" size="small"></el-input>
            </template>
          </el-table-column>
          <!-- 开关按钮 -->
          <el-table-column label="是否启用" prop="state">
            <template slot-scope="scope">
              <el-switch
                :disabled="scope.row.isflag? false:true"
                v-model="scope.row.state"
                active-color="#13ce66"
              ></el-switch>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                :type="scope.row.isflag?'success':'info'"
                @click="handleEdit(scope.row)"
                :disabled="scope.row.isDisabel"
              >{{scope.row.isflag? "成功":"编辑"}}</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                :disabled="scope.row.isDisabel"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-top:20px"
        ></el-pagination>

        <!-- 添加分类 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form">
            <el-form-item label="分类名称" label-width="120px">
              <el-input v-model="form.inputVal" clearable style="width:260px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" label-width="120px">
              <el-switch @change="switchCheck" v-model="form.state" active-color="#13ce66"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入模块
import fragment from "@/components/Home/fragment.vue";
// ajax
import { addcate, catelist, delcate, editcate } from "@/api/shop";
export default {
  components: { fragment },
  data() {
    return {
      value: true,
      tableData: [],

      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 1,

      // 添加分类 模态框
      dialogFormVisible: false,
      form: {
        state: false,
        inputVal: ""
      }
    };
  },
  methods: {
    async getList() {
      let { total, data } = await catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // 处理开关
      data.forEach(v => {
        v.state = v.state ? true : false;
        // 给每条数据添加一个isflag属性  使用该属性  控制 编辑的开关  按钮  分类的状态
        v.isflag = false;
        v.isDisabel = false;
      });
      this.tableData = data;
      this.total = total;
    },

    // 页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    // 编辑
    async handleEdit(row) {
      this.tableData.forEach(v => {
        v.isDisabel = true;
      });
      row.isDisabel = !row.isDisabel;
      // 点击切换isflag的状态 来控制可编辑  或者是 不可编辑
      row.isflag = !row.isflag;

      if (!row.isflag) {
        // 只有显示为成功状态时  才发送ajax6
        let { code } = await editcate({
          id: row.id,
          cateName: row.cateName,
          state: row.state
        });
        // 刷新列表
        this.getList();
      }
    },
    // 删除按钮
    handleDelete(id) {
      this.$confirm("是否永久删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await delcate({ id });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 添加分类
    addClassify() {
      this.dialogFormVisible = true;
    },
    // 确定添加分类
    async submit() {
      let { code } = await addcate({
        cateName: this.form.inputVal,
        state: this.form.state
      });
      this.dialogFormVisible = false;
      this.getList();
    },

    //开关改变时的状态
    switchCheck(flag) {
      this.form.state = flag;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped></style>
