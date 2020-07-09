<template>
  <div class="login">
    <div class="login-box">
      <h3>系统登录</h3>
      <el-input
        autofocus
        validate-event
        prefix-icon="el-icon-user"
        class="user"
        v-model="input"
        clearable
      >
      </el-input>
      <el-input
        prefix-icon="el-icon-setting"
        class="pwd"
        v-model="pwd"
        show-password
      ></el-input>
      <el-button @click="callback" class="btn" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      pwd: "",
    };
  },
  methods: {
    callback() {
      this.$router.push("/home");
    },
  },
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
  background: rgb(45, 58, 75);
  .login-box {
    height: 400px;
    width: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: #fff;
      letter-spacing: 5px;
      margin-bottom: 30px;
    }
    .user,
    .pwd {
      width: 400px;
      margin-bottom: 20px;
      font-size: 20px;
      /deep/input {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
