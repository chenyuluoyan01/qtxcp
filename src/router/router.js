import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '晴天修车后台管理系统-登录'
    },
    component: () => import('@/views/qtxc/login/loginMain')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/login',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  //日常报表
    {
        path: '/dailyReport',
        icon: 'document-text',
        title: '报表管理',
        name: 'dailyreport',
        expand: true,
        component: Main,
        children: [
            // { path: 'operatingReports', title: '运营报表', code:"yybb", name: 'operating_reports',
            //   component: () => import('@/views/home/home.vue') },
            { path: 'fundsManagement', title: '财务报表', code:"cwbb", name: 'funds_management',
              component: () => import('@/views/qtxc/dailyReport/fundsManagement/fundsManagement.vue') }
        ]
    },
    //用户管理
    {
        path: '/userMeg',
        icon: 'person-stalker',
        title: '用户管理',
        name: 'usermeg',
        expand: true,
        component: Main,
        children: [
            { path: 'carOnwerMeg', title: '车主管理', code:"czgl", name: 'car_onwer_meg',
              component: () => import('@/views/qtxc/userMeg/carOnwerMeg/carOnwerMeg.vue') },
            { path: 'carRepairShopMeg', title: '汽修店管理', code:"qxdgl", name: 'car_repair_shop_meg',
              component: () => import('@/views/qtxc/userMeg/carRepairShopMeg/carRepairShopMeg.vue') }
        ]
    },
    //订单管理
    {
        path: '/orderMeg',
        img: require('../images/order.png'),
        title: '订单管理',
        name: 'ordermeg',
        component: Main,
        expand: true,
        children: [
            { path: 'orderList', title: '全部订单',  code:"qbdd", name: 'order_list',
              component: () => import('@/views/qtxc/orderMeg/orderList/orderList.vue') },
            { path: 'disputeList', title: '纠纷订单',  code:"jfdd", name: 'dispute_list',
              component: () => import('@/views/qtxc/orderMeg/disputeList/disputeList.vue')}
        ]
    },
    //服务管理
    {
        path: '/serverMeg',
        img: require('../images/server.png'),
        title: '服务管理',
        name: 'servermeg',
        component: Main,
        expand: true,
        children: [
        { path: 'maintenanceProject', title: '保养项目',  code:"byxm", name: 'maintenance_project',
          component: () => import('@/views/qtxc/serverMeg/maintenanceProject/maintenanceProject.vue') },
          { path: 'repairProject', title: '维修项目',  code:"wxxm", name: 'repair_project',
          component: () => import('@/views/qtxc/serverMeg/repairProject/repairProject.vue') },
          { path: 'cleanProject', title: '清洗项目',  code:"qxxm", name: 'clean_project',
          component: () => import('@/views/qtxc/serverMeg/cleanProject/cleanProject.vue') },
          { path: 'sheetMetalSprayPaint', title: '钣金喷漆',  code:"bjpq", name: 'sheet_metal_spray_paint',
          component: () => import('@/views/qtxc/serverMeg/sheetMetalSprayPaint/sheetMetalSprayPaint.vue') },
          { path: 'rushHellp', title: '紧急救援',  code:"jjjy", name: 'rush_hellp',
          component: () => import('@/views/qtxc/serverMeg/rushHellp/rushHellp.vue') }
        ]
    },
    //车辆信息
    {
        path: '/carMeg',
        img: require('../images/car.png'),
        title: '车辆信息',
        name: 'carmeg',
        expand: true,
        component: Main,
        children: [
            { path: 'carBrand', title: '汽车品牌/保养手册',  code:"qcppbysc", name: 'car_brand',
              component: () => import('@/views/qtxc/carMeg/carBrand/carBrand.vue') },
            { path: 'carType', title: '车型管理',  code:"cxgl", name: 'car_type',
              component: () => import('@/views/qtxc/carMeg/carType/carType.vue')}
        ]
    },
    //商品管理
    {
        path: '/goodMeg',
        img: require('../images/good.png'),
        title: '商品管理',
        name: 'goodmeg',
        component: Main,
        expand: true,
        children: [
            { path: 'partsBrand', title: '商品列表',  code:"splb", name: 'parts_brand',
              component: () => import('@/views/qtxc/goodMeg/partsBrand/partsBrand.vue') },
            { path: 'partsGood', title: '配件品牌',  code:"pjpp", name: 'parts_good',
              component: () => import('@/views/qtxc/goodMeg/partsGood/partsGood.vue')}
        ]
    },
    //信息管理
    {
        path: '/msgMeg',
        icon: 'volume-medium',
        title: '信息管理',
        name: 'msgmeg',
        component: Main,
        expand: true,
        children: [
            { path: 'mechanicsScience', title: '汽修科普',  code:"qxkp", name: 'mechanics_science',
              component: () => import('@/views/qtxc/msgMeg/mechanicsScience/mechanicsScience.vue') },
            { path: 'toJoinFor', title: '加盟申请', code:"jmsq", name: 'to_join_for',
              component: () => import('@/views/qtxc/msgMeg/toJoinFor/toJoinFor.vue')},
              { path: 'idea', title: '意见/建议', code:"yjjy", name: 'idea',
              component: () => import('@/views/qtxc/msgMeg/idea/idea.vue') },
              // { path: 'pushPost', title: 'PUSH推送', code:"puts", name: 'push_post',
              // component: () => import('@/views/qtxc/msgMeg/pushPost/pushPost.vue') },
              { path: 'pushMsg', title: '平台通知' ,code:"tsxx", name: 'push_meg',
              component: () => import('@/views/qtxc/msgMeg/pushMsg/pushMsg.vue') }
        ]
    },
    //平台设置
    {
        path: '/platformSet',
        icon: 'gear-b',
        title: '平台设置',
        name: 'platformset',
        expand: true,
        component: Main,
        children: [
            { path: 'bannerSet', title: '广告设置', code:"ggsz", name: 'banner_set',
              component: () => import('@/views/qtxc/platformSet/bannerSet/bannerSet.vue') },
            { path: 'peopleMeg', title: '人员管理', code:"rygl", name: 'people_meg',
              component: () => import('@/views/qtxc/platformSet/peopleMeg/peopleMeg.vue')},
            { path: 'officeMeg', title: '职务管理', code:"zwgl", name: 'office_meg',
              component: () => import('@/views/qtxc/platformSet/officeMeg/officeMeg.vue')},
            { path: 'versionMeg', title: '版本管理', code:"bbgl", name: 'version_meg',
              component: () => import('@/views/qtxc/platformSet/versionMeg/versionMeg.vue')},
            { path: 'dictionayMeg', title: '字典管理', code:"zdgl", name: 'dictionay_meg',
              component: () => import('@/views/qtxc/platformSet/dictionayMeg/dictionayMeg.vue')},
            // { path: 'opLogs', title: '操作日志', code:"czrz", name: 'op_logs',
            //   component: () => import('@/views/qtxc/platformSet/opLogs/opLogs.vue')}
        ]
    },

    //客服管理
    /*{
        path: '/serviceMeg',
        icon: 'ios-telephone',
        title: '客服管理',
        name: 'servicemeg',
        expand: true,
        component: Main,
        children: [
            { path: 'onlineService', code:"zxkf", title: '在线客服', name: 'online_service',
              component: () => import('@/views/qtxc/serviceMeg/onlineService/onlineService.vue') },
            { path: 'recordTalk', code:"khgtjl", title: '客服沟通记录', name: 'record_talk',
              component: () => import('@/views/qtxc/serviceMeg/recordTalk/recordTalk.vue')},
            { path: 'autoBack', code:"zdhfsz", title: '自动回复设置', name: 'auto_back',
              component: () => import('@/views/qtxc/serviceMeg/autoBack/autoBack.vue')}
        ]
    },*/

    //评价管理
    {
        path: '/appraisalMeg',
        icon: 'chatbox-working',
        title: '评价管理',
        name: 'appraisalmeg',
        expand: true,
        component: Main,
        children: [
            { path: 'appraisalList', code:"pjlb", title: '评价列表', name: 'appraisal_list',
              component: () => import('@/views/qtxc/appraisalMeg/appraisalList/appraisalList.vue') }
        ]
    },

];
//console.log($.ajax({}))
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];

export default appRouter
