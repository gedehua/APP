/**
 * 订单相关的模块
 */

import req from "@/utils/request";

// 获取订单列表
export const list = (params) => {
  return req.get("/order/list", params);
};
// 查询
export const search = (params) => {
  return req.get("/order/search", params);
};
// 获取订单列表详请
export const detail = (params) => {
  return req.get("/order/detail", params);
};
// 修改订单
export const edit = (params) => {
  return req.post("/order/edit", params);
};
