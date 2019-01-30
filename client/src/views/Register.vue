<template>
<v-container>
  <v-layout justify-center wrap>
    <v-flex lg6 md6 sm10 xs12>
    <v-card>
      <v-card-title>
        <span class="title font-weight-black mx-auto">Sign Up Form</span>
      </v-card-title>
    <v-flex>
      <v-container>
        <RegisterForm></RegisterForm>
      </v-container>
    </v-flex>
    </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  components: {
    RegisterForm
  },
  data () {
    return {

    }
  }
}
</script>
