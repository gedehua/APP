<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">修改密码</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form
          style="width:350px"
          :model="changePwd"
          status-icon
          :rules="rules"
          ref="changePwd"
          label-width="100px"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="changePwd.oldPwd"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="changePwd.newPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确定新密码 -->
          <el-form-item label="确认新密码" prop="definePwd">
            <el-input type="password" v-model="changePwd.definePwd" autocomplete="off"></el-input>
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
// 引入正则组件
import { ACC_REG, PWD_REG } from "@/utils/reg.js";
// 组件
import fragment from "@/components/Home/fragment.vue";
// ajax
import { checkoldpwd, editpwd } from "@/api/account";
// local
import local from "@/utils/local";
export default {
  components: { fragment },
  data() {
    // 原密码失去焦点验证
    const checkOldPWD = async (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入原密码"));
      } else {
        let { code, msg } = await checkoldpwd({ oldPwd: val });
        if (code == "11") {
          callback(msg);
        }
      }
    };
    // 自定义验证新密码
    const checkNeWpWD = (rule, val, callback) => {
      if (!val) {
        callback(new Error("请输入密码"));
      } else if (!PWD_REG.test(val)) {
        callback(new Error("请输入3到12位:数字、大小写字母"));
      } else {
        callback();
      }
    };
    // 自定义再次确定新密码
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.changePwd.newPwd) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePwd: {
        oldPwd: "", //原密码
        newPwd: "", //新密码
        definePwd: "" //确定新密码
      },
      rules: {
        oldPwd: [{ required: true, validator: checkOldPWD, trigger: "blur" }],
        newPwd: { required: true, validator: checkNeWpWD, trigger: "blur" },
        definePwd: { required: true, validator: validatePass, trigger: "blur" }
      }
    };
  },
  methods: {
    // 提交
    submitForm() {
      this.$refs.changePwd.validate(valid => {
        if (valid) {
          // 成功
          const h = this.$createElement;
          this.$msgbox({
            title: "消息",
            message: h("p", null, [
              h("span", null, "恭喜你！修改成功，请重登录")
            ]),
            showClose: false,
            confirmButtonText: "确定",
            beforeClose: async (action, instance, done) => {
              // 发送ajax 请求修改密码
              let { code } = await editpwd({ newPwd: this.changePwd.newPwd });
              if (code === 0) {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = "执行中...";
                setTimeout(() => {
                  // 请本地存储
                  local.clear();
                  // 修改成功后跳到登录页面
                  this.$router.push("/login");
                  done();
                }, 500);
              }
            }
          });
        } else {
          // 失败
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.changePwd.resetFields();
    }
  }
  // bus接受登录时的密码
};
</script>

<style lang="less" scoped>
</style>
