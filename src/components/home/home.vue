<template>
  <el-container class="container">
    <!-- 顶部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img
              src="../../assets/images/logo.png"
              alt=""
            >
          </div>
        </el-col>
        <el-col
          :span="19"
          class="middle"
        >
          <div class="grid-content bg-purple-light">
            <h2>电商后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a
              href="#"
              class="loginout"
              @click="handleSignout()"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <!-- 底部 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside
        width="200px"
        class="aside"
      >
        <!-- 开启路由模式 -->
      <el-menu
            :router="true"
            :unique-opened="true"
            class="el-menu-vertical-demo">

                <el-submenu :index="''+item1.order" v-for="(item1,i) in menus" :key="i">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item1.authName}}</span>
                    </template>

                    <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
                        <template slot="title">
                            <i class="el-icon-sort"></i>
                            <span>{{item2.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>

            </el-menu>
      </el-aside>
      <!-- 右侧核心内容区 -->
      <el-main class="main">
        <!-- 用户列表的视图容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
        menus: []
    }
  },
  //在组件渲染之前,验证有没有token,没有则跳转回登录页面
  //利用钩子函数
  beforeCreate(){
    //获取token
   // const token=localStorage.getItem('token');
    //判断
    // if(!token){
    //   //编程式导航
    //   this.$router.push({name:'login'})
    //   this.$message.warning('无事别登三宝殿')
    // }
  },
  created(){
    this.getMenus()
  },
  methods:{
      // 获取侧边栏导航
    async getMenus() {
      const res = await this.$http.get(`menus`)
      // console.log(res)
      this.menus = res.data.data
    },
    handleSignout(){
      //提示
      this.$message.success('退出成功')
      //删除token
      localStorage.clear()
      //跳转到登录页
      this.$router.push({name:'login'})
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.header .middle{
    text-align: center
}
h2{
    line-height: 60px;
}
.header .loginout{
    line-height: 60px;
    text-decoration: none;
}
.aside {
  background-color: #d3dce6;
}
.aside .menu{
  height: 100%;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
