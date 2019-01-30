<template>
  <v-toolbar
    color="grey"
    app
    fixed
    clipped-left
  >
    <router-link class="title ml-3 mr-5 white--text" to="/" style="text-decoration: none">Hacktiv&nbsp;
      <span class="font-weight-light">Overflow</span>
    </router-link>
    <v-text-field
      solo
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="user.token">
      <v-btn flat to="/questions/add">
        <v-icon color="white">add_comment</v-icon>
        <span class="ml-2 white--text">Add Question</span>
      </v-btn>
      <v-btn
        flat
        color="red darken-2"
        class="font-weight-black"
        @click="logout"
      >Sign Out</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
      <v-btn
        flat
        color="red darken-2"
        class="font-weight-black"
        to="/users/register"
      >Sign Up</v-btn>
      <v-btn
        flat
        color="white"
        to="/users/login"
      >Sign In</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$swal({
        title: 'Are you sure?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('logout')
          this.$router.replace('/users/login')
          this.$swal('Logout', 'You successfully logout', 'success')
        }
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
