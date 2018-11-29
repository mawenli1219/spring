import axios from 'axios'
const httpHelper = {}
    // 配置Vue插件
httpHelper.install = function fn(Vue) {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
        //添加请求拦截器
        //在发送请求之前,会自动进入拦截器的callback,执行完继续请求
        //添加一个请求拦截器
    axios.interceptors.request.use(function(config) {
        //console.log(config);
        //在请求发送之前做一些事
        if (config.url !== 'login') {
            // config参数 headers头部 url标识
            const AUTH_TOKEN = localStorage.getItem('token')
            config.headers['Authorization'] = AUTH_TOKEN
        }
        return config;
    }, function(error) {
        //当出现请求错误是做一些事
        return Promise.reject(error);
    });

    //添加一个返回拦截器
    axios.interceptors.response.use(function(response) {
        //对返回的数据进行一些处理
        return response;
    }, function(error) {
        //对返回的错误进行一些处理
        return Promise.reject(error);
    });







    Vue.prototype.$http = axios
}

export default httpHelper