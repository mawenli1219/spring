import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/users.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/role/role.vue'

import {
    Message
} from 'element-ui';
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/',
        name: 'home',
        component: Home,
        children: [{
            path: '/users',
            name: 'users',
            component: Users
        }, {
            name: 'rights',
            path: '/rights',
            component: Rights
        }, {
            name: 'roles',
            path: '/roles',
            component: Role
        }]
    }]
})

// 路由、导航/守卫
// 在路由配置生效之前 会先来到下面方法的cb
// to 将要生效的路由配置对象
// from 当前的路由配置对象
// next 方法 next() 会继续执行路由配置和组件渲染
router.beforeEach((to, from, next) => {
    console.log(to, from)
        // 如果要去的是login next()
    if (to.path === '/login') {
        next()
    } else {

        // 如果去的不是login
        // 判断token token存在next()
        const token = localStorage.getItem('token')
        if (!token) {
            // this.$router -> router
            // 回到登录
            // this.$message.warning('asdasd')
            Message.warning('请先登录')
            router.push({
                name: 'login'
            })
            return
        }
        next()
    }

})

export default router