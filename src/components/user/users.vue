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
          @clear="loadUserList()"
          clearable
          v-model="query"
          placeholder="请输入用户名"
          class="searchInput"
        >
          <!-- 输入框组件 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser()"
          ></el-button>
        </el-input>
        <!-- 普通按钮组件 -->
        <el-button
          type="success"
          @click='showAddUser()'
        >添加用户</el-button>
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

      <!-- 时间格式化:过滤器. 第三步插值表达式后|处理,此处要显示
      如果单元格内容不是字符串/文本,需要给要展示的内容外层包裹一个template
      涉及到组件间传值新方法:slot-scope(把外层绑定的值传到内部) userlist是外层容器绑定的数据,即数据源-->
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>

      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="showEditDia(scope.row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="showMegBoxDele(scope.row.id)"
          ></el-button>
          <!-- 对勾 -->
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="showRowDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisibleAdd"
    >
      <el-form :model="form">
        <el-form-item
          label="用户名称"
          label-width="100px"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          label-width="100px"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          label-width="100px"
        >
          <el-input
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          label-width="100px"
        >
          <el-input
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form :model="form">
        <el-form-item
          label="用户名称"
          label-width="100px"
        >
          <!-- 禁止点击 -->
          <el-input
            v-model="form.username"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          label-width="100px"
        >
          <el-input
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          label-width="100px"
        >
          <el-input
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUser()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogFormVisibleRole"
    >
      <el-form :model="form">
        <el-form-item
          label="用户名"
          label-width="100px"
        >
          {{currUsername}}
        </el-form-item>
        <el-form-item
          label="角色"
          label-width="100px"
        >
          <!-- 如果 select 的v-model绑定的数据的值 -1和 option的value值 -->
          <el-select v-model="currRoleId">
            <el-option
              label="请选择"
              :value="-1"
            ></el-option>
            <el-option
              v-for="(item,i) in roles"
              :key="i"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      userlist: [
        {
          create_time: "",
          email: "",
          id: "",
          mg_state: "",
          mobile: "",
          role_name: "",
          username: ""
        }
      ],
      //getuserlist获取用户列表请求需要的参数
      pagenum: 1,
      pagesize: 2,
      total: -1,
      //对话框--添加
      dialogFormVisibleAdd: false,
      // 对话框 - 编辑对话框
      dialogFormVisibleEdit: false,
      //对话框 -分配角色
      dialogFormVisibleRole:false,
      //用户的表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 分配角色
      // 当前用户的用户名
      currUsername: "",
      // 当前用户的角色的id el-select v-model绑定
      currRoleId: -1,
      // 保存角色信息的数据
      roles: [],
      // 当前用户的id
      currUserId: -1
    };
  },
  //钩子函数渲染
  created() {
    this.getUserList();
  },
  methods: {
    //对勾--分配角色功能
    //(1)点击对勾,展示对话框
    async showRowDia(user) {
      //1展示对话框
      this.dialogFormVisibleRole=true;
      //2,给当前用户id赋值
      this.currUserId=user.id
      //3,获取当前的用户名
      this.currUsername=user.username
      //4,展示其他下拉框 即获取角色列表 发送请求
      const res1= await this.$http.get('roles')
      //5,赋值给data中空数组roles
      this.roles=res1.data.data
      //console.log(res1);
      //6,获取当前用户的角色id
      const res2= await this.$http.get(`users/${user.id}`)
      //赋值给currRoleId
      //console.log(res2);
      this.currRoleId=res2.data.data.rid
    },
    //(2)点击确定,发送修改的请求
     async setRole(){
       const res= await this.$http.put(`users/${this.currUserId}/role`,{
         rid:this.currRoleId
       })
       //关闭对话框
       this.dialogFormVisibleRole=false
     },
    //修改用户状态功能:  switch的change事件
    async changeUserState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
    },

    //编辑功能
    //(1)点击编辑按钮,弹出对话框
    showEditDia(user) {
      this.form = user;
      this.dialogFormVisibleEdit = true;
    },
    //(2)点击确定,发送put请求,修改数据
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      //提示
      this.$message.success(msg);
      //关闭对话框
      this.dialogFormVisibleEdit = false;
      //更新视图
      this.getUserList();
    },
    //删除功能--->对应MessageBox弹框组件
    showMegBoxDele(userID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //点击确定后,发送请求
          const res = await this.$http.delete(`users/${userID}`);
          //更新视图
          this.getUserList();
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.meta.msg
          });
        });
    },
    //添加功能
    //(1)点击添加按钮,弹出对话框
    showAddUser() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //(2)点击确定,发送请求,添加用户
    async addUser() {
      //1发送请求
      const res = await this.$http.post("users", this.form);
      //console.log(res);
      const {
        meta: { status, msg },
        data
      } = res.data;
      //判断
      if (status === 201) {
        //关闭对话框
        this.dialogFormVisibleAdd = false;
        //提示
        this.$message.success(msg);
        //更新视图
        this.getUserList();
        //清空input内容
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    //搜索框重置
    loadUserList() {
      this.getUserList();
    },
    //搜索功能
    searchUser() {
      //重置当前页码
      this.pagenum = 1;
      this.getUserList();
    },
    //分页相关方法
    //每个条数修改时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //赋值
      this.pagesize = val;
      //重置页码
      this.pagenum = 1;
      //更新视图
      this.getUserList();
    },
    //当前页码改变时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //页码赋值
      this.pagenum = val;
      //更新视图
      this.getUserList();
    },
    //获取用户列表
    async getUserList() {
      // 接口文档: 需要授权的API->设置请求头 Authorization=token -> axios文档
      // 设置请求头 进行授权
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      //解构赋值
      const {
        meta: { msg, status },
        data: { total, users }
      } = res.data;
      if (status === 200) {
        //将数据赋值给total和userlist
        this.total = total;
        this.userlist = users;
        //提示成功
        this.$message.success(msg);
      } else {
        this.message.warning(msg);
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.searchRow {
  margin-top: 20px;
}
.searchInput {
  width: 300px;
}
.pagination {
  margin-top: 20px;
}
</style>
