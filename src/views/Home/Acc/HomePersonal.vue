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
        <p class="time">创建时间：{{data.ctime | fn}}</p>
        <div>
          管理员头像:
          <el-upload
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
          >
            <img v-if="imgUrl" :src="imgBeasUrl+imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-button type="success" @click="checkSend" size="small">确定修改</el-button>
      </div>
    </fragment>
  </div>
</template>

<script>
// 引入卡片
import fragment from "@/components/Home/fragment.vue";
// 引入ajax
import { avatarUpload, avataredit } from "@/api/account";
// 引入moment
import moment from "moment";
// local
import local from "@/utils/local";
export default {
  components: { fragment },
  data() {
    return {
      // 个人中心数据
      data: {},
      // 图片服务器所在的位置
      imgBeasUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
      imgUrl: "" //图片名
    };
  },
  methods: {
    // 文件上传成功之后执行的函数  参数是响应回来的数据
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.$message({ type: "success", message: res.msg });
        this.imgUrl = res.imgUrl;
      }
    },

    // 上传文件之前的函数, 参数为上传文件,主要是对上传文件做修饰 限定大小和限制类型
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 点击发送数据  修改头像
    async checkSend() {
      let { code } = await avataredit({ imgUrl: this.imgUrl });

      if (code === 0) {
        this.$bus.$emit("updata_avatar");
      }
    }
  },
  created() {
    this.data = local.get("user");
  },
  filters: {
    fn(v) {
      return moment(v).format("YYYY-MM-DD HH:mm:ss");
    }
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
}
// 上传头像
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 20px 0px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>