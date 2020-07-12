<template>
  <div>
    <fragment>
      <!-- 标题 -->
      <span slot="title">商品添加</span>
      <!-- 内容 -->
      <div slot="content">
        <el-form size="small" style="width:400px" ref="form" label-width="80px">
          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类">
            <el-select v-model="value" @change="checkOps">
              <el-option
                @visible-change="aaa(val)"
                v-for="(v,i) in arr"
                :key="i"
                :value="v.cateName"
              >{{v.cateName}}</el-option>
            </el-select>
          </el-form-item>
          <!-- 商品价格 -->
          <el-form-item label="商品价格">
            <el-input-number v-model="price"></el-input-number>
          </el-form-item>
          <!-- 商品图片 -->
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
              <img width="100%" :src="imgUrl" alt />
            </el-dialog>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品价格">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="goodsDesc"></el-input>
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
      // 商品分类
      arr: [],
      value: "",
      // 商品
      name: "",
      price: 1,
      imgUrl: "",
      // 描述
      goodsDesc: "",
      dialogVisible: false
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
    },

    // 处理选中的分类
    checkOps(opt) {
      this.opts = opt;
    },

    // // 添加按钮
    async addBtn() {
      let { code } = add({
        name: this.name,
        category: this.opts,
        price: this.price,
        imgUrl: "sdsandjnas.jpg",
        goodsDesc: this.goodsDesc
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
</style>
