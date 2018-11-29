import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/users.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/role/role.vue'

Vue.use(Router)

export default new Router({
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
            name: 'role',
            path: '/role',
            component: Role
        }]
    }]
})