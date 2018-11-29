// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
//引入公共样式
import '@/assets/css/base.css'
//引入axios
import http from '@/plugins/http.js'
//引入自定义面包屑组件
import MyBread from '@/components/cuscom/myBread.vue'
Vue.use(http)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
//全局自定义组件--面包屑
Vue.component(MyBread.name, MyBread)
    //自定义全局过滤器:处理日期格式化
Vue.filter('fmtdate', (v) => {
    return moment(v).format('YYYY-MM-DD')
})
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})