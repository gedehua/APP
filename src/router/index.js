import Vue from "vue";
import VueRouter from "vue-router";
// 登录
import Login from "@/views/Login.vue";
// home
import Home from "@/views/Home/Home.vue";

// local
import local from "@/utils/local";
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
    meta: { title: "后台首页" },
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
    redirect: "/home/order/list",
    meta: { title: "订单管理" },
    children: [
      {
        path: "/home/order/list",
        component: () => import("@/views/Home/Order/HomeOrderList.vue"),
        meta: { title: "订单列表" },
      },
      {
        path: "/home/order/edit",
        name: "orderEdit",
        component: () => import("@/views/Home/Order/HomeOrderEdit.vue"),
        meta: { title: "订单编辑" },
      },
    ],
  },
  // 商品管理
  {
    path: "/home/commodity",
    component: Home,
    redirect: "/home/commodity/list",
    meta: { title: "商品管理" },
    children: [
      {
        path: "/home/commodity/list",
        component: () => import("@/views/Home/Commodity/HomeCommodityList.vue"),
        meta: { title: "商品列表" },
      },
      {
        path: "/home/commodity/list/modify",
        component: () =>
          import("@/views/Home/Commodity/HomeCommodityListChange.vue"),
        meta: { title: "修改商品" },
      },
      {
        path: "/home/commodity/add",
        component: () => import("@/views/Home/Commodity/HomeCommodityAdd.vue"),
        meta: { title: "商品添加" },
      },
      {
        path: "/home/commodity/classify",
        component: () =>
          import("@/views/Home/Commodity/HomeCommodityClassify.vue"),
        meta: { title: "商品分类" },
      },
    ],
  },
  // 店铺管理
  {
    path: "/home/shop",
    component: Home,
    meta: { title: "店铺管理" },
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
    meta: { title: "账号管理" },
    children: [
      {
        path: "/home/acc/list",
        component: () => import("@/views/Home/Acc/HomeAccList.vue"),
        meta: { title: "账号列表" },
      },
      {
        path: "/home/acc/add",
        component: () => import("@/views/Home/Acc/HomeAccAdd.vue"),
        meta: { title: "添加账号" },
      },
      {
        path: "/home/acc/modify",
        component: () => import("@/views/Home/Acc/HomeAccmodify.vue"),
        meta: { title: "修改密码" },
      },
      {
        path: "/home/acc/personal",
        component: () => import("@/views/Home/Acc/HomePersonal.vue"),
        meta: { title: "个人中心" },
      },
    ],
  },
  // 统计
  {
    // Sale
    path: "/home/sale",
    component: Home,

    redirect: "/home/sale/shop",
    meta: { title: "销售统计" },
    // 三级路由
    children: [
      {
        path: "/home/sale/shop",
        component: () => import("@/views/Home/Sale/HomeSaleShopStatistics.vue"),
        meta: { title: "商品统计" },
      },
      {
        path: "/home/sale/order",
        component: () =>
          import("@/views/Home/Sale/HomeSaleOrderStatistics.vue"),
        meta: { title: "订单统计" },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

/* 路由守卫 */
// router.beforeEach((to, from, next) => {
//   /*
//     to: 你要去哪栋？ 【你要去的目标路由对象】
//     from: 你从哪里来啊？ 【你离开的路由对象】
//     next： 走吧 放行 【是个函数】
//   */

//   // 判断是否登录
//   let isLogin = local.get("t_k") ? true : false;

//   if (isLogin) {
//     next(); // 如果登录过 直接放行
//   } else {
//     // 如果去的是登录
//     if (to.path === "/login") {
//       next(); // 放行
//     } else {
//       next({ path: "/login" }); // 否则 去的就是别的页面 重置到登录
//     }
//   }
// });

export default router;
