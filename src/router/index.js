import Vue from "vue";
import VueRouter from "vue-router";
// 登录
import Login from "@/views/Login.vue";
// home
import Home from "@/views/Home/Home.vue";
// 404
import h404 from "@/views/Home/404.vue";

// local
import local from "@/utils/local";
Vue.use(VueRouter);

// 避免导航冗余
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// routes
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
];

const computedRouter = [
  // {
  //   path: "/",
  //   redirect: "/login",
  //   visible: false,
  // },
  // 登录
  {
    path: "/login",
    component: Login,
    visible: false,
  },
  //后端首页
  {
    path: "/home",
    component: Home,
    redirect: "/home/index",
    meta: { title: "后台首页", icon: "icon-iconfonthome0" },
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
    meta: { title: "订单管理", icon: "icon-dingdan2" },
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
    meta: {
      title: "商品管理",
      role: ["super", "normal"],
      icon: "icon-shangping",
    },
    children: [
      {
        path: "/home/commodity/list",
        component: () => import("@/views/Home/Commodity/HomeCommodity.vue"),
        redirect: "/home/commodity/list",
        meta: { title: "商品列表" },
        children: [
          {
            path: "/home/commodity/list",
            component: () =>
              import("@/views/Home/Commodity/HomeCommodityList.vue"),
            meta: { title: "列表详情" },
          },
          {
            path: "/home/commodity/modify",
            component: () =>
              import("@/views/Home/Commodity/HomeCommodityListChange.vue"),
            meta: { title: "修改商品" },
          },
        ],
      },
      {
        path: "/home/commodity/add",
        component: () => import("@/views/Home/Commodity/HomeCommodityAdd.vue"),
        meta: { title: "商品添加", role: ["super"] },
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
    meta: { title: "店铺管理", icon: "icon-dianpuicon" },
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
    meta: {
      title: "账号管理",
      role: ["super", "normal"],
      icon: "icon-zhanghaoguanli",
    },
    children: [
      {
        path: "/home/acc/list",
        component: () => import("@/views/Home/Acc/HomeAccList.vue"),
        meta: { title: "账号列表", role: ["super"] },
      },
      {
        path: "/home/acc/add",
        component: () => import("@/views/Home/Acc/HomeAccAdd.vue"),
        meta: { title: "添加账号", role: ["super"] },
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
    meta: {
      title: "销售统计",
      role: ["super"],
      icon: "icon-shangpinshichangfenxi",
    },
    role: ["super"],
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
  // 404
  {
    path: "*",
    component: h404,
    visible: false,
  },
];

const router = new VueRouter({
  routes,
});

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  /*
    to: 你要去哪栋？ 【你要去的目标路由对象】
    from: 你从哪里来啊？ 【你离开的路由对象】
    next： 走吧 放行 【是个函数】
  */

  // 判断是否登录
  let isLogin = local.get("t_k") ? true : false;

  if (isLogin) {
    next(); // 如果登录过 直接放行
  } else {
    // 如果去的是登录
    if (to.path === "/login") {
      next(); // 放行
    } else {
      next({ path: "/login" }); // 否则 去的就是别的页面 重置到登录
    }
  }
});

// 动态计算路由
/**
 * @description: 计算出当前角色有权限访问的路由
 * @param: asyncRoutes 当前所有动态路由
 * @param: role  当前用户角色
 * @returns:  数组 当前可以访问的路由数组
 */
function ComputingDynamicRouter(computedRouter, role) {
  //动态计算路由
  // console.log(computedRouter, role);

  // 循环过滤
  let accessRoutes = computedRouter.filter((item) => {
    // 如果有权限
    if (hasPermission(item, role)) {
      // 如果有权限的一级路由对象里还有二级路由对象也设置了权限，或者是二级路由对象里  嵌套三级路由对象
      // 需要使用递归的方式 计算出动态的权限路由
      if (item.children && item.children.length) {
        item.children = ComputingDynamicRouter(item.children, role); //递归过滤
      }

      return true;
    } else {
      //  没有权限
      return false;
    }
  });

  return accessRoutes;
}

/**
 * @description：判断当前路由对象 有权限还是没有权限
 * @param1：router 当前路由对象
 * @param2: role 当前用户角色
 * @returns: true 有权限 false 没有权限
 */
function hasPermission(router, role) {
  // 如果路由中有meta 且 meta中有role 证明配置了权限 需要做权限验证
  if (router.meta && router.meta.role) {
    // 返回当前用户角色可以访问的权限路由
    return router.meta.role.includes(role);
  } else {
    // 否则就是没有配置任何权限 不需要做权限验证 默认都是有权限的
    return true;
  }
}

/**
 * @description: 计算权限菜单
 * @param1：当前有权访问的路由
 * @param2：当前角色
 */
function clacMenus(accessRoutes, role) {
  let arr = accessRoutes.filter((item) => {
    // 根据当前用户的角色 判断要在左侧显示的菜单栏
    if (isVisible(item, role)) {
      return true; //if条件为true  返回true 在左侧显示
    } else {
      return false; //if条件为false 返回false 不在左侧显示
    }
  });
  return arr; //返回过滤后要在左侧显示的菜单栏
}

/**
 * @description ：判断在不在左侧显示的菜单
 * @param：当前路由参数
 * @param：当前角色
 */
function isVisible(router, role) {
  if (router.hasOwnProperty("visible")) {
    //如果当前的路由对象 有visible 属性  就返回false  就不在菜单栏显示
    return false;
  } else {
    return true; //如果没有 就在菜单栏显示
  }
}

// 根据当前的角色，动态创建当前角色可以访问的路由
export function PrivilegeRouting() {
  //从本地存储取出当前登录角色
  let role = local.get("role");
  // 计算出有权限访问的路由
  let accessRoutes = ComputingDynamicRouter(computedRouter, role);

  // 动态添加路由 【把算出来的权限路由 动态挂载】
  router.addRoutes(accessRoutes); // addRoutes是路由内置的方法 可以动态添加路由

  // 计算动态的菜单
  let menus = clacMenus(accessRoutes, role);

  // 将动态菜单存入本地
  local.set("menus", menus);
}
PrivilegeRouting(); //初始化调用
export default router;
