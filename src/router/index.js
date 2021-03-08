/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/main/Main.vue'),
            redirect: 'dashboard',
            name: '控制台',
            meta: {
                name: '控制台',
                icon: 'HomeIcon'
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'dashbord',
                    component: () => import('@/views/dashbord/index.vue'),
                    meta: {
                        rule: 'editor',
                        name: '控制台',
                        icon: 'HomeIcon'
                    }
                },
            ]
        },
        {
            path: '/',
            component: () => import('@/layouts/main/Main.vue'),
            redirect: 'api',
            name: '系统设置',
            meta: {
                name: '系统设置',
                icon: 'SettingsIcon'
            },
            children: [
                {
                    path: "api",
                    name: 'api管理',
                    component: () => import("@/views/pages/systerm/api/index.vue"),
                    meta: {
                        rule: 'admin',
                        name: 'api管理',
                        icon: 'SettingsIcon'
                    }
                }
            ]
        },
        {
            path: '/user',
            component: () => import('@/layouts/main/Main.vue'),
            name: '用户中心',
            meta: {
                name: '用户中心',
                icon: 'UsersIcon'
            },
            children: [
                {
                    path: 'mine',
                    name: '个人信息',
                    component: () => import('@/views/pages/user/mine.vue'),
                    meta: {
                        rule: 'admin',
                        name: '个人信息',
                        icon: 'UserIcon'
                    }
                },
                {
                    path: 'index',
                    name: '用户列表',
                    component: () => import('@/views/pages/user/index.vue'),
                    meta: {
                        rule: 'editor',
                        name: '用户列表',
                        icon: 'UsersIcon'
                    }
                },
            ]
        },
        

        // {
        //     path: '/',
        //     component: () => import('@/layouts/main/Main.vue'),
        //     children: [
        //         {
        //             path: '/apps',
        //             name: 'apps',
        //             component: () => import('@/views/dashbord/apps.vue'),
        //             meta: {
        //                 rule: 'editor',
        //             }
        //         },
        //         {
        //             path: '/crm',
        //             name: 'crm',
        //             component: () => import('@/views/pages/crm/index.vue'),
        //             meta: {
        //                 rule: 'admin',
        //             }
        //         },
        //         {
        //             path :"/user",
        //             redirect:"/user/index"
        //         },

        //         {
        //             path :"meal/index",
        //             name : '资费套餐',
        //             component:()=>import("@/views/pages/meal/index.vue"),
        //             meta :{
        //                 rule : 'admin'
        //             }
        //         },

        //     ]
        // },
        /***
         * 
         * login
         * 
         * 
         */
        {
            path: '/login',
            name: 'pageLogin',
            component: () => import('@/views/pages/login/index.vue'),
            meta: {
                rule: 'editor'
            }
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            name: 'pageError404',
            component: () => import('@/views/pages/404/index.vue'),
            meta: {
                rule: 'editor'
            }
        }
    ]
})


router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router