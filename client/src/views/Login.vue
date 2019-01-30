<template>
<v-container>
  <v-layout justify-center wrap>
    <v-flex lg4 md5 sm10 xs12>
    <v-card>
      <v-card-title>
        <span class="title font-weight-black mx-auto">Sign In</span>
      </v-card-title>
    <v-flex>
      <v-container>
        <LoginForm></LoginForm>
      </v-container>
    </v-flex>
    </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  components: {
    LoginForm
  },
  data () {
    return {

    }
  }
}
</script>
