<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread
      level1="权限管理"
      level2="角色列表"
    ></my-bread>
    <el-row class="addRole">
      <el-col>
        <el-button @click="showAddRole()">添加角色</el-button>

      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="rolelist"
      style="width: 100%"
    >

      <el-table-column
        type="expand"
        width="80"
      >
        <template slot-scope="scope">
          <el-row
            v-for="(item1,index) in scope.row.children"
            :key="index"
          >
            <el-col>
              <el-tag>{{item1.authName}}</el-tag>
            </el-col>
            <el-col>
              <el-row>
                <el-col>
                  <el-tag></el-tag>
                </el-col>
                <el-col>
                  <el-tag></el-tag>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
        </template>

      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showEditRoleDia(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="showDeleBox(scope.row.id)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            @click="showSetRoleDia(scope.row)"
            circle
          ></el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisibleAdd"
    >
      <el-form :model="form">
        <el-form-item
          label="角色名称"
          label-width="100px"
        >
          <el-input
            v-model="form.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          label-width="100px"
        >
          <el-input
            v-model="form.roleDesc"
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
          @click="addRole()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form :model="form">
        <el-form-item
          label="角色名称"
          label-width="100px"
        >
          <el-input
            v-model="form.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          label-width="100px"
        >
          <el-input
            v-model="form.roleDesc"
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
          @click="EditRole()"
        >确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      //角色信息form
      form: {
        roleName: "",
        roleDesc: ""
      },
      //对话框--添加角色
      dialogFormVisibleAdd: false,
      //对话框--编辑角色
      dialogFormVisibleEdit:false
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //获取角色列表
    async getRoleList() {
      const res = await this.$http.get("roles");
      this.rolelist = res.data.data;
    },
   //编辑功能:
   //(1)点击编辑按钮,弹出对话框
   showEditRoleDia(role){
     this.form=role
      this.dialogFormVisibleEdit = true;
   },
   //(2)点击确定按钮,发送修改请求
   async EditRole(){
     const res=await this.$http.put(`roles/${this.form.id}`,this.form)
      const {
        meta: { msg, status }
      } = res.data;
      //关闭对话框
      this.dialogFormVisibleEdit=false
      //提示
      this.$message.success(msg)
      //更新视图
      this.getRoleList()
   },



    //添加用户
    //(1)点击添加按钮,弹出对话框
    showAddRole() {
      this.dialogFormVisibleAdd = true;
    },
    //(2),点击确定,添加角色
    async addRole() {
      const res = await this.$http.post("roles", this.form);
      const {
        meta: { status, msg },
        data
      } = res.data;
      //判断
      if (status == 201) {
        //关闭对话框
        this.dialogFormVisibleAdd = false;
        //提示
        this.$message.success(msg);
        //更新视图
        this.getRoleList();
        //清空input
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    //删除功能
    showDeleBox(rolesID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //点击确定后,发送请求
          const res = await this.$http.delete(`roles/${rolesID}`);
          //更新视图
          this.getRoleList();
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
    }
  }
};
</script>

<style>
.addRole {
  margin-top: 20px;
}
</style>
