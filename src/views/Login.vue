<template>
  <div class="login">
    <div class="login-box">
      <h3>系统登录</h3>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" size="medium " label-width="100px">
        <!-- 账户 -->
        <el-form-item label="账户" prop="acc">
          <el-input
            clearable
            type="text"
            v-model="loginForm.acc"
            prefix-icon="el-icon-user-solid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="pwd">
          <el-input
            :type="isOpen?'text':'password'"
            v-model="loginForm.pwd"
            prefix-icon="el-icon-s-tools"
            :suffix-icon="isOpen?'iconfont icon-yanjing':'iconfont icon-yanjing1'"
            autocomplete="off"
            @click.native="isPwd"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入正则
import { ACC_REG, PWD_REG } from "@/utils/reg";
export default {
  data() {
    // 账户验证
    const checkAcc = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入账号"));
      } else if (!ACC_REG.test(val)) {
        callback(new Error("3到8位,文字、字母"));
      } else {
        callback();
      }
    };

    // 密码验证
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
      // 判断是否 type&&icon 是否打开
      isOpen: false,
      loginForm: {
        acc: "",
        pwd: ""
      },
      rules: {
        acc: { required: true, validator: checkAcc, trigger: "blur" },
        pwd: { required: true, validator: checkPwd, trigger: "blur" }
      }
    };
  },
  methods: {
    callback() {
      this.$router.push("/home");
    },
    // 点击小图片 切换类型 切换icon
    isPwd(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    },
    // 提交登录
    submitForm() {
      this.$refs.loginForm.validate(data => {
        if (data) {
          this.$message({
            showClose: true,
            message: "欢迎:" + this.loginForm.acc,
            type: "success"
          });
          this.$router.push("/home");
        } else {
          this.$message({
            showClose: true,
            message: "请输入用户名",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/imgs/xinkong.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: #fff;
      letter-spacing: 6px;
      margin-bottom: 30px;
      font-size: 26px;
      font-weight: 400;
      margin-left: 90px;
    }
    .el-form {
      width: 400px;
      /deep/.el-form-item__label {
        color: #fff;
      }

      /deep/.el-input__inner {
        background: transparent;
        color: #fff;
      }
      .el-button {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
</style>
