<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">账户列表</span>
      <!-- 内容 -->
      <div slot="content">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          @selection-change="handleSectionChange"
          ref="accTable"
          style="width: 100%"
        >
          <!-- 复选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 账户 -->
          <el-table-column prop="account" label="账户" width="200"></el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="200"></el-table-column>
          <!-- 创建时间 -->
          <el-table-column prop="ctime" label="创建时间" width="300"></el-table-column>
          <!-- 操作 -->
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
        <!-- 按钮 -->
        <div class="btn">
          <el-button @click="batchDel" size="small" type="danger">批量删除</el-button>
          <el-button @click="cancelSelect" size="small" type="primary">取消选择</el-button>
        </div>

        <!-- 编辑模态框 -->
        <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="360px">
          <!-- 编辑表单 -->
          <el-form :model="editForm" style="width: 275px;" size="small" label-width="60px">
            <el-form-item label="账号">
              <el-input v-model="editForm.account"></el-input>
            </el-form-item>

            <el-form-item label="用户组">
              <el-select v-model="editForm.userGroup">
                <el-option value="超级管理员">超级管理员</el-option>
                <el-option value="普通管理员">普通管理员</el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="saveEdit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入卡片组件
import fragment from "@/components/Home/fragment.vue";
// 引入axios函数
import { getAccList, delAcc, batchdelAccs, editAcc } from "@/api/account";
// 引入moment
import moment from "moment";
export default {
  components: { fragment },
  data() {
    return {
      // 账户列表数据
      tableData: [],
      // 总条数
      total: 0,
      // 当前页码
      currentPage: 1,
      // 每页显示的条数
      pageSize: 5,

      // 编辑
      editForm: {
        account: "",
        userGroup: ""
      },

      // 模态框
      dialogVisible: false
    };
  },

  methods: {
    // 封装一个获取数据的方法
    async getData() {
      let { total, data } = await getAccList({
        currentPage: this.currentPage, //当前页码
        pageSize: this.pageSize //每页显示的条数
      });

      // 处理时间
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD");
      });
      // 边界判断 如果当前页码没有数据 且 当前页码不是第一页时
      if (!data.length && this.currentPage !== 1) {
        this.currentPage--; //页码减1
        this.getData(); //重新获取数据
      }

      // 渲染总条数
      this.total = total;
      // 渲染列表数据
      this.tableData = data;
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData(); //调用第二次
    },
    // 页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData(); //调用三次
    },

    // 删除按钮
    handleDelete(id) {
      this.$confirm("是否永久删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delAcc({ id }); //发送删除请求
          if (code === 0) {
            this.getData(); //重新获取数据刷新
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 当选项发生改变时
    handleSectionChange(rows) {
      // 获取到所有的id  挂载在实例对象上
      this.ids = rows.map(v => v.id);
    },

    // 批量删除
    batchDel() {
      // 优化体验  没有选择  是不能删除的   给个提示
      if (!this.ids) {
        this.$message.error("请选择后再删除");
        return;
      }
      // 删除提示
      this.$confirm("是否永久删除所选记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送删除的ajax
          let { code } = await batchdelAccs({ ids: JSON.stringify(this.ids) }); //发送删除请求
          if (code === 0) {
            this.getData(); //重新获取数据刷新
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 取消选择
    cancelSelect() {
      this.$refs.accTable.clearSelection();
    },

    // 编辑信息
    handleEdit(row) {
      this.dialogVisible = true;
      // 点击编辑信息按钮
      this.editForm = { ...row };
    },
    // 保存编辑信息
    async saveEdit(row) {
      let { code } = await editAcc({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.userGroup
      });
      if (code === 0) {
        this.getData(); // 刷新
        this.dialogVisible = false; // 关闭模态框
      }
    }
  },

  // 创建前渲染一次
  created() {
    this.getData(); //调用一次
  }
};
</script>

<style lang="less" scoped></style>
