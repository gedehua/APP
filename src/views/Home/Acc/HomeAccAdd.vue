<template>
  <div class="home-acc-add">
    <div class="home-acc-add-box">
      <!-- titleP 插槽 组件 -->
      <titleP>添加账号</titleP>
      <el-form :model="addAcc" status-icon :rules="rules" ref="addAcc" label-width="100px">
        <!-- 账号 -->
        <el-form-item class="input" label="账号" prop="acc">
          <el-input v-model="addAcc.acc"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="input" label="密码" prop="pwd">
          <el-input type="password" v-model="addAcc.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户组 -->
        <el-form-item class="input" label="用户组" prop="checkPass">
          <el-select v-model="values" clearable placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮组 -->
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm">提交</el-button>
          <el-button size="small" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import titleP from "@/components/Home/title.vue";
export default {
  components: { titleP },
  data() {
    return {
      addAcc: {
        acc: "",
        pwd: ""
      },
      // 用户组
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      values: "",
      // 内置验证规则
      rules: {
        acc: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录验证表单
    submitForm() {
      // 和ref 绑定的表单 整个表单触发 validete 验证
      this.$refs.addAcc.validate(valid => {
        if (valid) {
          this.$message({
            message: "恭喜你,添加成功",
            type: "success"
          });
          // this.
          this.addAcc = { acc: "", pwd: "" };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置按钮
    resetForm() {
      this.$refs.addAcc.resetFields();
    }
  }
  // bus接受登录时的密码
};
</script>

<style lang="less" scoped>
.home-acc-add {
  padding: 20px;
  box-sizing: border-box;
  .home-acc-add-box {
    height: 400px;
    width: 100%;
    background: #fff;

    .el-form {
      width: 322px;
    }
  }
}
</style>
