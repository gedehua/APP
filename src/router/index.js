import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
// home
import Home from "@/views/Home/Home.vue";
import HomeIndex from "@/views/Home/HomeIndex.vue";
import HomeOrder from "@/views/Home/HomeOrder.vue";
import HomeShop from "@/views/Home/HomeShop.vue";
// HomeCommodity
import HomeCommodity from "@/views/Home/Commodity/HomeCommodity.vue";
import HomeCommodityList from "@/views/Home/Commodity/HomeCommodityList.vue";
import HomeCommodityAdd from "@/views/Home/Commodity/HomeCommodityAdd.vue";
import HomeCommodityClassify from "@/views/Home/Commodity/HomeCommodityClassify.vue";
// Acc
import HomeAcc from "@/views/Home/Acc/HomeAcc.vue";
import HomeAccList from "@/views/Home/Acc/HomeAccList.vue";
import HomeAccAdd from "@/views/Home/Acc/HomeAccAdd.vue";
import HomeAccmodify from "@/views/Home/Acc/HomeAccmodify.vue";

// Sale
import HomeSale from "@/views/Home/Sale/HomeSale.vue";
import HomeSaleOrderStatistics from "@/views/Home/Sale/HomeSaleOrderStatistics.vue";
import HomeSaleShopStatistics from "@/views/Home/Sale/HomeSaleShopStatistics.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,

    // 二级路由
    children: [
      { path: "/", redirect: "/home/index" },
      { path: "/home/index", component: HomeIndex },
      { path: "/home/order", component: HomeOrder },
      {
        // commodity
        path: "/home/commodity",
        component: HomeCommodity,
        redirect: "/home/commodity/list",
        // 三级路由
        children: [
          { path: "/home/commodity/list", component: HomeCommodityList },
          { path: "/home/commodity/add", component: HomeCommodityAdd },
          {
            path: "/home/commodity/classify",
            component: HomeCommodityClassify,
          },
        ],
      },
      { path: "/home/shop", component: HomeShop },
      {
        // Acc
        path: "/home/acc",
        component: HomeAcc,
        redirect: "/home/acc/list",
        // 三级路由
        children: [
          { path: "/home/acc/list", component: HomeAccList },
          { path: "/home/acc/add", component: HomeAccAdd },
          {
            path: "/home/acc/modify",
            component: HomeAccmodify,
          },
        ],
      },
      {
        // Sale
        path: "/home/sale",
        component: HomeSale,
        redirect: "/home/sale/shop",
        // 三级路由
        children: [
          { path: "/home/sale/shop", component: HomeSaleShopStatistics },
          { path: "/home/sale/order", component: HomeSaleOrderStatistics },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
