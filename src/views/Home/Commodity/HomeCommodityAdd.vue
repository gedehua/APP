<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品添加</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form
          size="small"
          :model="addData"
          :rules="rules"
          style="width:400px"
          ref="form"
          label-width="80px"
        >
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="addData.name"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类" prop="category">
            <el-select v-model="addData.category">
              <el-option v-for="(v,i) in arr" :key="i" :value="v.cateName">{{v.cateName}}</el-option>
            </el-select>
          </el-form-item>
          <!-- 商品价格 -->
          <el-form-item label="商品价格" prop="price">
            <el-input-number v-model="addData.price"></el-input-number>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片" prop="imgUrl">
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
            >
              <img v-if="addData.imgUrl" :src="imgBeasUrl+addData.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" prop="goodsDesc">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addData.goodsDesc"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" type="primary" @click="addBtn">添加商品</el-button>
      </div>
    </fragment>
  </div>
</template>

<script>
// ajax
import { categoriess, add } from "@/api/shop";

// 引入模块
import fragment from "@/components/Home/fragment.vue";
export default {
  components: { fragment },
  data() {
    return {
      // 商品分类数据
      arr: [],
      // 渲染数据
      addData: {
        name: "",
        category: "",
        price: 1,
        imgUrl: "",
        goodsDesc: ""
      },
      // 内置验证规则
      rules: {
        name: { required: true, message: "请输入商品名称", trigger: "blur" },
        category: {
          required: true,
          message: "请选择商品分类",
          trigger: "change"
        },
        price: { required: true, message: "请输入商品价格", trigger: "change" },
        imgUrl: { required: true, message: "请上传图片", trigger: "blur" },
        goodsDesc: {
          required: true,
          message: "请输入商品描述",
          trigger: "blur"
        }
      },
      // 图片服务器所在的位置
      imgBeasUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/"
    };
  },
  methods: {
    // 文件上传成功之后执行的函数  参数是响应回来的数据
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.$message({ type: "success", message: res.msg });
        this.addData.imgUrl = res.imgUrl;
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

    // 添加按钮
    addBtn() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let { code } = await add(this.addData);
          if (code === 0) {
            this.$router.push("/home/commodity/list");
          }
        }
      });
    }
  },

  //获取分类
  async created() {
    let { categories } = await categoriess();
    this.arr = categories;
  }
};
</script>

<style lang="less" scoped>
// 上传头像
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 40px 0px 0px;
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
