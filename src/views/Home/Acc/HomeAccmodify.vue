<template>
  <div class="home-acc-modify">
    <div class="home-acc-modify-box">
      <!-- titleP 插槽 组件 -->
      <titleP>修改密码</titleP>
      <el-form :model="changePwd" status-icon :rules="rules" ref="changePwd" label-width="100px">
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
  </div>
</template>

<script>
// 组件
import titleP from "@/components/Home/title.vue";
export default {
  components: { titleP },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
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
        oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        definePwd: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 3 到 6 个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交
    submitForm() {
      this.$refs.changePwd.validate(valid => {
        if (valid) {
          const h = this.$createElement;
          this.$msgbox({
            title: "消息",
            message: h("p", null, [
              h("span", null, "恭喜你！修改成功，请重登录")
            ]),
            showClose: false,
            confirmButtonText: "确定",
            beforeClose: (action, instance, done) => {
              if (action === "confirm") {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = "执行中...";
                setTimeout(() => {
                  // 修改成功后跳到登录页面
                  this.$router.push("/login");
                  done();
                  // setTimeout(() => {
                  //   instance.confirmButtonLoading = false;
                  // }, 300);
                }, 500);
              } else {
                done();
              }
            }
          }).then(action => {
            this.$message({
              type: "success",
              message: "请登录: " + action
            });
          });
        } else {
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
.home-acc-modify {
  padding: 20px;
  box-sizing: border-box;
  .home-acc-modify-box {
    height: 400px;
    width: 100%;
    background: #fff;
    .el-form {
      width: 400px;
    }
  }
}
</style>
