<template>
<div class="login-wrap">
<el-form class="login-form" label-position="top" label-width="80px" :model="formData">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
         <el-button @click.prevent="handleLogin()" class="login-button" type="primary">登录</el-button>
</el-form>
</div>

</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      this.$http.post("login", this.formData).then(res => {
        const {
          meta: { msg, status },
          data
        } = res.data;
        if(status===200){
          //保存用户token值
          //将来在home组件渲染之前,先判断token有没有
          const token =localStorage.setItem('token', data.token)
          //跳转到首页
          this.$router.push({name:'home'});
          //提示登录成功
          this.$message.success(msg);

        }else{
          //提示登录失败
          this.$message.warning(msg)
        }
      });
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 10px;
}
.login-button {
  width: 100%;
}
</style>
