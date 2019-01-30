<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :type="show ? 'text' : 'password'"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @click:append="show = !show"
    ></v-text-field>
    <v-btn
      @click="submit"
      block
    >Login</v-btn>
    <span>Do not have an account? <router-link to="/register">Sign Up</router-link></span>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="color"
    >
      {{ status }}
      <v-btn
        color="white"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },

  data: () => ({
    email: '',
    password: '',
    show: false,
    snackbar: false,
    status: '',
    timeout: 2000,
    color: ''
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$axios.post('/login', {
          email: this.email,
          password: this.password
        })
          .then(({ data }) => {
            this.snackbar = true
            this.status = 'Login Success'
            this.color = 'success'
            this.$store.dispatch('loginSuccess', data)
            this.$router.replace('/questions')
          })
          .catch(({ response }) => {
            if (response.status === 400) {
              this.snackbar = true
              this.status = response.data.message
            } else {
              this.snackbar = true
              this.status = response.data.message
            }
            this.color = 'error'
          })
      }
    },
    clear () {
      this.$v.$reset()
      this.email = ''
      this.password = ''
    }
  }
}
</script>
