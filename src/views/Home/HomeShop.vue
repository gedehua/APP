<template>
  <div>
    <!-- 店铺管理 -->
    <fragment>
      <!-- 标题 -->
      <span slot="title">店铺管理</span>
      <!-- 按钮 -->
      <el-button
        size="small"
        :type="isflag? 'success' : 'primary'"
        slot="btn"
        @click="switchFlag"
      >{{isflag?'完成':'编辑'}}</el-button>
      <!-- 内容 -->
      <div slot="content">
        <el-form
          ref="form"
          :model="form"
          :disabled="!isflag? true :false"
          label-width="80px"
          style="width:400px"
        >
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input type="textarea" :rows="6" v-model="form.bulletin"></el-input>
          </el-form-item>
          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.avatar" :src="imgBeasUrl+ form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 店铺背景墙 -->
          <el-form-item label="店铺头像">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :file-list="form.pics"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>

          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input-number v-model="form.deliveryPrice" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <!-- 配送时间 -->
          <el-form-item label="配送时间">
            <el-input-number v-model="form.deliveryTime" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <!-- 配送描述 -->
          <el-form-item label="配送描述">
            <el-select v-model="form.description" clearable placeholder="订单状态">
              <el-option value="蜂鸟专送">蜂鸟专送</el-option>
              <el-option value="美团专送">美团专送</el-option>
              <el-option value="饿了吗专送">饿了吗专送</el-option>
            </el-select>
          </el-form-item>

          <!-- 店铺评分 -->
          <el-form-item class="score" label="店铺评分">
            <el-rate
              v-model="form.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
            <!-- <el-input v-model="form.score"></el-input> -->
          </el-form-item>
          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input-number v-model="form.sellCount" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <!-- 活动 -->
          <el-form-item label="活动">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="多人精彩套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="form.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              format="HH:mm:ss"
            ></el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </fragment>
  </div>
</template>

<script>
// ajax
import { info, upload, shopEdit } from "@/api/shop";
import fragment from "@/components/Home/fragment.vue";
// moment
import moment from "moment";
export default {
  components: { fragment },
  data() {
    return {
      form: {
        supports: [],
        date: []
      },
      dialogVisible: false,
      // 模态框放大的图片路径
      dialogImageUrl: "",
      // 取反标杆
      isflag: false,
      // 图片服务器所在的位置
      imgBeasUrl: "http://127.0.0.1:5000/upload/shop/"
    };
  },
  methods: {
    // 获取数据ajax
    async getLit() {
      let { data } = await info();
      // 处理商铺背景图的格式
      data.pics = data.pics.map(v => ({ url: this.imgBeasUrl + v }));
      this.form = data;
    },
    // 切换按钮
    async switchFlag() {
      this.isflag = !this.isflag;

      if (!this.isflag) {
        /**
         * 直接对原数据进行操作  因为数据的双向绑定  会更改原数据
         */
        // this.form.pics = JSON.stringify(
        //   this.form.pics.map(v => v.url.substr(this.imgBeasUrl.length))
        // );
        // this.form.supports = JSON.stringify(this.form.supports);
        // this.form.date = JSON.stringify(this.form.date);
        // let { code } = await shopEdit(this.form);

        // 深拷贝数据  然后对数据进行处理成后端需要的格式
        let newData = JSON.parse(JSON.stringify(this.form));
        // 处理图片组
        newData.pics = JSON.stringify(
          newData.pics.map(v => v.url.substr(this.imgBeasUrl.length))
        );
        // 处理活动组
        newData.supports = JSON.stringify(newData.supports);
        // 处理时间
        newData.date.forEach(v => moment(v).format("YYYY-MM-DD HH:mm:ss"));
        newData.date = JSON.stringify(newData.date);
        let { code } = await shopEdit(newData);
        if (code === 0) {
          this.getLit();
        }
      }
    },
    // 上传头像
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.form.avatar = imgUrl;
      }
    },
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

    // 商店照片墙删除图片
    handleRemove(file) {
      this.form.pics.forEach((v, i) => {
        if (v.uid === file.uid) {
          this.form.pics.splice(i, 1);
        }
      });
      console.log(this.form.pics);
    },
    // 店铺上传图片成功时
    handleSuccess(file) {
      // 上传成功时 处理图片存储格式
      this.form.pics.push({
        url: this.imgBeasUrl + file.imgUrl
      });
      console.log(this.form.pics);
    },
    // 上传成功时，显示放大功能，图片显示在模态框
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },

  created() {
    this.getLit();
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

// 上传头像
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 160px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.score {
  display: flex;
  // justify-content: center;
  // align-content: center;
  align-items: center;

  /deep/.el-form-item__content {
    margin-left: 20px !important;
  }
}
</style>
