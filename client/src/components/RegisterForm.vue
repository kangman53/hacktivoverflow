<template>
  <form>
    <v-text-field
      v-model="fullname"
      :error-messages="fullnameErrors"
      label="Fullname"
      required
      @input="$v.fullname.$touch()"
      @blur="$v.fullname.$touch()"
    ></v-text-field>
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
      @blur="$v.password.$touch()"
      @click:append="show = !show"
    ></v-text-field>
    <v-text-field
      v-model="repeatPassword"
      :type="show ? 'text' : 'password'"
      :error-messages="repeatPasswordErrors"
      label="Confirm Password"
      required
      @blur="$v.repeatPassword.$touch()"
    ></v-text-field>
    <v-btn
      @click="submit"
      block
    >Register</v-btn>
    <span>Already have an account? <router-link to="/login">Sign In</router-link></span>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="red headline font-weight-black white--text">
          <v-icon
            large
            class="mr-2"
            color="white"
          >error</v-icon>
          ERROR
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-tile
              v-for="(error, i) in errors"
              :key="i"
            >
              <v-list-tile-content>
                <v-layout row>
                  <v-flex>
                    <v-icon color="red" large>close</v-icon>
                  </v-flex>
                  <v-flex>
                    {{ error }}

                  </v-flex>
                </v-layout>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            OKE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email, exist: false },
    fullname: { required, minLength: minLength(3) },
    password: { required, minLength: minLength(6) },
    repeatPassword: { sameAs: sameAs('password') }
  },

  data: () => ({
    fullname: '',
    email: '',
    password: '',
    repeatPassword: '',
    show: false,
    dialog: false,
    errors: []
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.exist && errors.push('E-mail is already registered')
      return errors
    },
    fullnameErrors () {
      const errors = []
      if (!this.$v.fullname.$dirty) return errors
      !this.$v.fullname.minLength && errors.push('Fullname must be at least 3 characters long')
      !this.$v.fullname.required && errors.push('Fullname is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAs && errors.push('Confirm Password did not match')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$axios.post('/register', {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        })
          .then(({ data }) => {
            this.$swal('Success', 'Registration Success, login to continue', 'success')
            this.clear()
            this.$router.replace('/users/login')
          })
          .catch(({ response }) => {
            this.errors = []
            let message = response.data.message
            this.dialog = true
            for (const key in message) {
              this.errors.push(message[key].message)
            }
          })
      }
    },
    clear () {
      this.$v.$reset()
      this.fullname = ''
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
    }
  }
}
</script>
