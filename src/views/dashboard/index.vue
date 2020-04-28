<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import studentDashboard from './student'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, studentDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('admin')) {
      this.currentRole = 'adminDashboard'
    } else if (this.roles.includes('teacher')) {
      this.currentRole = 'editorDashboard'
    } else if (this.roles.includes('student')) {
      this.currentRole = 'studentDashboard'
    }
  }
}
</script>
