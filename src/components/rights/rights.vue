<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread
      level1="权限管理"
      level2="权限列表"
    ></my-bread>
    <!-- 表格 height固定头部(overflow:hidden) -->
    <el-table
      height="450px"
      class="table"
      :data="rightlist"
      border
      style="width: 100%"
    >

      <el-table-column
        label="#"
        type="index"
        width="80"
      >
      </el-table-column>

      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>

      <el-table-column
        prop="path"
        label="路径"
        width="240"
      >
      </el-table-column>

      <el-table-column label="层级">
        <template slot-scope="scope">
            <span v-if="scope.row.level==='0'">一级</span>
            <span v-if="scope.row.level==='1'">二级</span>
            <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
    data(){
        return{
            rightlist:[]
        }
    },
    created(){
          this.getRightlist()
    },
    methods:{
      //获取列表权限数据
      async getRightlist(){
          const res=await this.$http.get('rights/list')
          //赋值
          this.rightlist=res.data.data
      }
    }
};
</script>

<style>
.box-card {
  height: 100%;
}
.table {
  margin-top: 20px;
}
</style>
