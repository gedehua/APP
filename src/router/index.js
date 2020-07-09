import Vue from "vue";
import VueRouter from "vue-router";
// 登录
import Login from "@/views/Login.vue";
// home
import Home from "@/views/Home/Home.vue";

Vue.use(VueRouter);

// 避免导航冗余
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  // 登录
  {
    path: "/login",
    component: Login,
  },
  //后端首页
  {
    path: "/home",
    component: Home,
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        component: () => import("@/views/Home/HomeIndex.vue"),
      },
    ],
  },
  // 订单管理
  {
    path: "/home/order",
    component: Home,
    children: [
      { path: "", component: () => import("@/views/Home/HomeOrder.vue") },
    ],
  },
  // 商品管理
  {
    path: "/home/commodity",
    component: Home,
    redirect: "/home/commodity/list",
    children: [
      {
        path: "/home/commodity/list",
        component: () => import("@/views/Home/Commodity/HomeCommodityList.vue"),
      },
      {
        path: "/home/commodity/add",
        component: () => import("@/views/Home/Commodity/HomeCommodityAdd.vue"),
      },
      {
        path: "/home/commodity/classify",
        component: () =>
          import("@/views/Home/Commodity/HomeCommodityClassify.vue"),
      },
    ],
  },
  // 店铺管理
  {
    path: "/home/shop",
    component: Home,
    children: [
      { path: "", component: () => import("@/views/Home/HomeShop.vue") },
    ],
  },
  // 账户管理
  {
    // Acc
    path: "/home/acc",
    component: Home,
    redirect: "/home/acc/list",
    children: [
      {
        path: "/home/acc/list",
        component: () => import("@/views/Home/Acc/HomeAccList.vue"),
      },
      {
        path: "/home/acc/add",
        component: () => import("@/views/Home/Acc/HomeAccAdd.vue"),
      },
      {
        path: "/home/acc/modify",
        component: () => import("@/views/Home/Acc/HomeAccmodify.vue"),
      },
      {
        path: "/home/acc/personal",
        component: () => import("@/views/Home/Acc/HomePersonal.vue"),
      },
    ],
  },
  // 统计
  {
    // Sale
    path: "/home/sale",
    component: Home,
    redirect: "/home/sale/shop",
    // 三级路由
    children: [
      {
        path: "/home/sale/shop",
        component: () => import("@/views/Home/Sale/HomeSaleShopStatistics.vue"),
      },
      {
        path: "/home/sale/order",
        component: () =>
          import("@/views/Home/Sale/HomeSaleOrderStatistics.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
