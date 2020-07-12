<template>
  <div>
    <!-- 组件 -->
    <fragment>
      <!-- 标题 -->
      <span slot="title">添加账号</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form
          style="width:322px"
          :model="addAccForm"
          status-icon
          :rules="rules"
          ref="addAccForm"
          label-width="100px"
        >
          <!-- 账号 -->
          <el-form-item class="input" label="账号" prop="account">
            <el-input v-model="addAccForm.account"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item class="input" label="密码" prop="password">
            <el-input type="password" v-model="addAccForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item class="input" label="用户组" prop="userGroup">
            <el-select v-model="addAccForm.userGroup" clearable placeholder="请选择用户组">
              <el-option value="超级管理员">超级管理员</el-option>
              <el-option value="普通管理员">普通管理员</el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm">提交</el-button>
            <el-button size="small" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入接口层
import { AddAccount } from "@/api/account";
// 引入自己封装的面板
import fragment from "@/components/Home/fragment.vue";
// 引入正则
import { ACC_REG, PWD_REG } from "@/utils/reg";
export default {
  components: { fragment },
  data() {
    // 自定义验证账号
    /**
     * rule：是一个对象，暂时不用
     * val：代表用户输入的值 === addAccForm里的值
     * callback：回调函数
     *    错误：callback( new Error('错误信息'))
     *    正确：callback()
     */
    const checkAcc = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入账号"));
      } else if (!ACC_REG.test(val)) {
        callback(new Error("3到8位:文字、字母"));
      } else {
        callback();
      }
    };

    // 密码
    const checkPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入账号"));
      } else if (!PWD_REG.test(val)) {
        callback(new Error("3到12位,数字、大小写字母"));
      } else {
        callback();
      }
    };

    return {
      addAccForm: {
        // 账号
        account: "",
        // 密码
        password: "",
        // 下拉框
        userGroup: ""
      },
      // 内置验证规则
      rules: {
        account: { required: true, validator: checkAcc, trigger: "blur" },
        password: { required: true, validator: checkPwd, trigger: "blur" },
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 登录验证表单
    submitForm() {
      // 和ref 绑定的表单 整个表单触发 validete 验证
      this.$refs.addAccForm.validate(async valid => {
        // 判断valid 的状态  为true 就代表 表单验证成功 false 代表失败
        if (valid) {
          // 成功发送axios
          let { code } = await AddAccount(this.addAccForm);
          if (code !== 0) {
            this.$message.error("添加失败,请稍后再试");
          }
        }
        // this.addAccForm = { account: "", password: "", userGroup: "" };
      });
    },
    // 重置按钮
    resetForm() {
      this.$refs.addAccForm.resetFields();
    }
  }
  // bus接受登录时的密码
};
</script>

<style lang="less" scoped></style>
