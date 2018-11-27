<template>
  <el-card class='box'>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          v-model="query"
          placeholder="请输入用户名"
          class="searchInput"
        >
          <!-- 输入框组件 -->
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <!-- 普通按钮组件 -->
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- data=就是网络请求返回的数据数组,label指表头,prop对应userlist中每个对象的key -->
    <el-table
      :data="userlist"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建日期"
      >
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
      >
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
 data(){
     return {
         query:'',
        userlist: [
        {
          create_time: '',
          email: '',
          id: '',
          mg_state: '',
          mobile: '',
          role_name: '',
          username: ''
        }
      ],
      //getuserlist获取用户列表请求需要的参数
      pagenum: 1,
      pagesize: 2,
      total: -1,
     }
 },
 //钩子函数渲染
 created() {
    this.getUserList()
  },
 methods:{
     //获取用户列表
     async getUserList(){
         // 接口文档: 需要授权的API->设置请求头 Authorization=token -> axios文档
      // 设置请求头 进行授权
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
       
       const res=await this.$http.get(`users?query=${this.query}&pagenum=${this. pagenum}&pagesize=${this.pagesize}`)
        console.log(res)
        //解构赋值
        const {meta:{msg,status},data:{total,users}}=res.data
        if(status===200){
            //将数据赋值给total和userlist
            this.total=total
            this.userlist=users
            //提示成功
            this.$message.success(msg)
        }else{
            this.message.warning(msg)
        }
     }
 }
}
</script>

<style>
  .box{
      height: 100% 
  }
  .searchRow{
      margin-top: 20px;
  }
  .searchInput {
  width: 300px;
}
</style>
