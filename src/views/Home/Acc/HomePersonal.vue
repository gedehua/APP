<template>
  <div class="home-acc-personal">
    <fragment>
      <!-- 管理员信息 -->
      <span slot="title">管理员信息</span>
      <!-- 内容 -->
      <div slot="content" class="home-acc-personal-box">
        <p>管理员ID：{{data.id}}</p>
        <p>账号：{{data.account}}</p>
        <p>用户组：{{data.userGroup}}</p>
        <p class="time">创建时间：{{data.ctime}}</p>
        <div>
          管理员头像:
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :submit="ss"
          >
            <img v-if="data.imgUrl" :src="data.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入卡片
import fragment from "@/components/Home/fragment.vue";
// 引入ajax
import { accountinfo, avatarUpload } from "@/api/account";
// 引入moment
import moment from "moment";
// local
import local from "@/utils/local";
export default {
  components: { fragment },
  methods: {
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    ss() {
      console.log(1);
    }
  },
  data() {
    return {
      data: {}
    };
  },
  async created() {
    let accountInfo = await accountinfo();
    accountInfo.ctime = moment(accountInfo.ctime).format("YYYY-MM-DD HH:mm:ss");
    this.data = accountInfo;
    local.set("img", accountInfo.imgUrl);
  }
};
</script>

<style lang="less" scoped>
.home-acc-personal-box {
  padding: 0px 20px 20px;
  box-sizing: border-box;

  p {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    &.time {
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
    }
  }

  // 上传头像
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>