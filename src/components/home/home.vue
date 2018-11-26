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
          class="el-menu-vertical-demo"
        >

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="users">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>

          </el-submenu>

          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-printer"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>

          </el-submenu>

          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>

          </el-submenu>

          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>

          </el-submenu>

          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>

            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧核心内容区 -->
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //在组件渲染之前,验证有没有token,没有则跳转回登录页面
  //利用钩子函数
  beforeCreate(){
    //获取token
    const token=localStorage.getItem('token');
    //判断
    if(!token){
      //编程式导航
      this.$router.push({name:'login'})
      this.$message.warning('无事别登三宝殿')
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
