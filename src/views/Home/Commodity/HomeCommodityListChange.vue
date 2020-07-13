<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品修改</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form
          :model="shopData"
          :rules="rules"
          ref="shopData"
          label-width="100px"
          style="width:400px"
        >
          <!-- 商品ID -->
          <el-form-item label="商品ID" prop="id">
            <el-input disabled v-model="shopData.id"></el-input>
          </el-form-item>

          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="shopData.name"></el-input>
          </el-form-item>

          <!-- 商品分类 -->
          <el-form-item label="商品分类" prop="category">
            <el-select v-model="shopData.category">
              <el-option v-for="(v,i) in arr" :key="i" :value="v.cateName">{{v.cateName}}</el-option>
            </el-select>
          </el-form-item>

          <!-- 商品价格 -->
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="shopData.price"></el-input>
          </el-form-item>

          <!-- 商品图片地址 -->
          <el-form-item label="商品图片" prop="imgUrl">
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
            >
              <img v-if="shopData.imgUrl" :src="imgBeasUrl+shopData.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 商品描述 -->
          <el-form-item label="商品描述" prop="goodsDesc">
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
              <el-button size="mini" type="info" plain @click="handleDelete">重置</el-button>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </fragment>
  </div>
</template>

<script>
// ajax
import { categoriess, edit } from "@/api/shop";
// local
import local from "@/utils/local";
import fragment from "@/components/Home/fragment.vue";
export default {
  components: { fragment },

  data() {
    return {
      // imgUrl: "",
      arr: [],
      shopData: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: ""
      },
      // 图片服务器所在的位置
      imgBeasUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
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
      }
    };
  },

  methods: {
    //  提交
    handleEdit() {
      this.$refs.shopData.validate(async valid => {
        // 判断valid 的状态  为true 就代表 表单验证成功 false 代表失败
        if (valid) {
          let { code } = await edit(this.shopData);
          if (code === 0) {
            local.remove("shop");
            this.$router.push("/home/commodity/list");
          }
        }
      });
    },
    // 重置
    handleDelete() {
      // 重置表单
      // 清空本地
      this.$refs.shopData.resetFields();
      local.remove("shop");
    },

    // 文件上传成功之后执行的函数  参数是响应回来的数据
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.$message({ type: "success", message: res.msg });
        this.shopData.imgUrl = res.imgUrl;
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
    }
  },

  async created() {
    // 渲染分类列表
    let { categories } = await categoriess();
    this.arr = categories;

    // 渲染参数
    let a = local.get("shop");
    // 有值才渲染
    if (a) {
      this.shopData = a;
    }
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