<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品修改</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form :model="shopData" ref="shopData" label-width="100px" style="width:400px">
          <!-- 商品ID -->
          <el-form-item label="商品ID">
            <el-input disabled v-model="shopData.id"></el-input>
          </el-form-item>

          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="shopData.name"></el-input>
          </el-form-item>

          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="shopData.category" placeholder="请选择活动区域">
              <el-option label="特色粥品" value="shanghai"></el-option>
              <el-option label="精美川菜" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <!-- 商品价格 -->
          <el-form-item label="商品价格">
            <el-input v-model="shopData.price"></el-input>
          </el-form-item>

          <!-- 商品图片地址 -->
          <el-form-item label="商品图片地址">
            <el-input v-model="shopData.imgUrl"></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopData.imgUrl" :src="shopData.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="shopData.goodsDesc"></el-input>
          </el-form-item>

          <!-- 按钮组 -->
          <el-form-item>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                plain
                @click="handleEdit(scope.$index, scope.row)"
              >提交</el-button>
              <el-button
                size="mini"
                type="info"
                plain
                @click="handleDelete(scope.$index, scope.row)"
              >重置</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </fragment>
  </div>
</template>

<script>
import fragment from "@/components/Home/fragment.vue";
export default {
  components: { fragment },

  data() {
    return {
      shopData: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  methods: {
    //  提交
    handleEdit() {
      this.$router.push("/home/commodity/list");
    },
    // 重置
    handleDelete() {},

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.shopData.imgUrl = URL.createObjectURL(file.raw);
      console.log(res, file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>