/**
 * 账号模块相关的所有请求
 */

import req from "@/utils/request";

// 登录请求
export const checkLogin = (params) => {
  return req.post("/users/checkLogin", params);
};

// 添加账户
export const AddAccount = (params) => {
  return req.post("/users/add", params);
};

// 获取账号列表
export const getAccList = (params) => {
  return req.get("/users/list", params);
};

// 删除账号
export const delAcc = (params) => {
  return req.get("/users/del", params);
};

// 批量删除账号
export const batchdelAccs = (params) => {
  return req.get("/users/batchdel", params);
};

// 修改账号
export const editAcc = (params) => {
  return req.post("/users/edit", params);
};
// 检查旧密码是否正确
export const checkoldpwd = (params) => {
  return req.get("/users/checkoldpwd", params);
};

// 修改密码
export const editpwd = (params) => {
  return req.post("/users/editpwd", params);
};

// 获取账号(个人中心)信息
export const accountinfo = () => {
  return req.get("/users/info");
};

// 头像上传接口
export const avatarUpload = (params) => {
  return req.post("/users/avatar_upload", params);
};

// 修改用户头像接口
export const avataredit = (params) => {
  return req.get("/users/avataredit", params);
};
