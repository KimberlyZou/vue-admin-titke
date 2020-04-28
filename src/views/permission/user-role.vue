<template>
  <div class="app-container">
    <el-button v-if="checkPermission(['admin'])" type="primary" @click="handleAddUserRole">创建新角色</el-button>

    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学校">
        <template slot-scope="scope">
          {{ scope.row.university }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="专业">
        <template slot-scope="scope">
          {{ scope.row.academy }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="班级">
        <template slot-scope="scope">
          {{ scope.row.userClass }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="邮件">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="密码">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="(checkPermission(['teacher'])&& scope.row.role === 'student')||checkPermission(['admin'])" type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button v-if="(checkPermission(['teacher'])&& scope.row.role === 'student')||checkPermission(['admin'])" type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'添加新用户'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="Role Name" />
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="user.role" class="filter-item" placeholder="Please select">
            <el-option v-for="item in rolesList" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="学校">
          <el-input
            v-model="user.university"
            placeholder="教师学校"
          />
        </el-form-item>
        <el-form-item label="专业">
          <el-input
            v-model="user.academy"
            placeholder="教师专业"
          />
        </el-form-item>
        <el-form-item label="班级">
          <el-input
            v-model="user.userClass"
            placeholder="教师班级"
          />
        </el-form-item>
        <el-form-item label="邮件">
          <el-input
            v-model="user.email"
            placeholder="教师邮件"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="user.password"
            placeholder="教师密码"
          />
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import checkPermission from '@/utils/permission'
import { getUserRole, addUserRole, deleteUserRole, updateUserRole, deleteAdminRole, deleteStudentRole } from '@/api/role'

const defaultUser = {
  username: '',
  role: '',
  university: '',
  academy: '',
  userClass: '',
  email: '',
  password: ''
}
const rolesList = [
  { key: '2', display_name: '老师' },
  { key: '1', display_name: '系统管理员' },

]

export default {
  data() {
    return {
      user: Object.assign({}, defaultUser),
      routes: [],
      userList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      rolesList,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getUserRoles()
  },
  methods: {
    checkPermission,
    async getUserRoles() {
      const res = await getUserRole()
      this.userList = res.data
    },

    handleAddUserRole() {
      this.user = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          console.log(row.role)
          if(row.role === 'teacher'){
            await deleteUserRole(row.id)
            this.userList.splice($index, 1)
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })
          }else if(row.role === 'admin'){
            await deleteAdminRole(row.id)
            this.userList.splice($index, 1)
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })
          }else if(row.role === 'student'){
            await deleteStudentRole(row.id)
            this.userList.splice($index, 1)
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })
          }     
        })
        .catch(err => { console.error(err) })
    },

    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateUserRole(this.user.id, this.user)
        for (let index = 0; index < this.userList.length; index++) {
          if (this.userList[index].id === this.user.id) {
            this.userList.splice(index, 1, Object.assign({}, this.user))
            break
          }
        }
      } else {
        const { data } = await addUserRole(this.user)
        this.user.id = data.id
        this.userList.push(this.user)
      }

      const { username, password } = this.user
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>用户名: ${username}</div>
            <div>密码: ${password}</div>
          `,
        type: 'success'
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
