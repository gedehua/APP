/**
 * 商品所有相关的模块
 */

import req from "@/utils/request";

// 添加分类
export const addcate = (params) => {
  return req.post("/goods/addcate", params);
};
// 获取分类
export const catelist = (params) => {
  return req.get("/goods/catelist", params);
};
// 删除分类
export const delcate = (params) => {
  return req.get("/goods/delcate", params);
};
// 修改分类
export const editcate = (params) => {
  return req.post("/goods/editcate", params);
};

// 查询所有分类名称
export const categoriess = (params) => {
  return req.get("/goods/categories", params);
};
// 商品图片上传接口
export const img_upload = (params) => {
  return req.post("/goods/goods_img_upload", params);
};

// 添加商品
export const add = (params) => {
  return req.post("/goods/add", params);
};

// 获取商品列表
export const list = (params) => {
  return req.get("/goods/list", params);
};
// 修改商品
export const edit = (params) => {
  return req.post("/goods/edit", params);
};
// 删除商品
export const del = (params) => {
  return req.get("/goods/del", params);
};
