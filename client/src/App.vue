<template>
  <v-app id="keep">
    <Sidebar />
    <Toolbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
export default {
  name: 'App',
  components: {
    Sidebar,
    Toolbar
  },
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    if (localStorage.token) {
      this.$axios.get('/token', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('loginSuccess', data)
          this.$store.dispatch('getTags')
        })
        .catch(({ response }) => {
          localStorage.removeItem('token')
        })
    }
  }
}
</script>
