<template>
  <div class="home-commondity-add">
    <div class="home-commondity-add-box">
      <titleP>商品添加</titleP>

      <div class="from">
        <!-- 商品名称 -->
        <el-form size="small" ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <!-- 商品分类 -->
        <el-form size="small" ref="form" :model="form" label-width="80px">
          <el-form-item label="商品分类">
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 商品价格 -->
        <el-form size="small" ref="form" :model="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-input-number size="small" v-model="num3"></el-input-number>
          </el-form-item>
        </el-form>
        <!-- 商品图片 -->
        <el-form size="small" ref="form" :model="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
        </el-form>
        <!-- 商品描述 -->
        <el-form size="small" ref="form" :model="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" size="small" type="primary">添加商品</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import titleP from "@/components/Home/title.vue";
export default {
  components: {
    titleP
  },
  data() {
    return {
      form: { name: "" },
      value: "",
      options: "",
      num3: 1,
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      // 多行文本域
      textarea: ""
    };
  },
  methods: {
    // 上传图片

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.home-commondity-add {
  padding: 20px;
  box-sizing: border-box;
  .home-commondity-add-box {
    width: 100%;
    background: #fff;

    .from {
      width: 400px;
    }
    .btn {
      margin-left: 80px;
      margin-bottom: 20px;
    }
  }
}
</style>
