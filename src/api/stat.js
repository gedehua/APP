/**
 * 报表接口
 */

import req from "@/utils/request";

// 首页报表
export const totaldata = () => {
  return req.get("/order/totaldata");
};
// 订单报表
export const ordertotal = (params) => {
  return req.get("/order/ordertotal", params);
};
