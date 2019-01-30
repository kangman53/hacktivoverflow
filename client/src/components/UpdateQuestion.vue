<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout>
      <v-flex>
        <v-card>
          <v-layout justify-center>
            <v-flex lg8>
              <v-card-title class="title font-weight-bolder">
                Update a question
              </v-card-title>
              <v-card-text>
                <form>
                  <v-text-field
                    v-model="title"
                    :error-messages="titleErrors"
                    label="Title"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  ></v-text-field>
                  <wysiwyg v-model="description"></wysiwyg>
                  <v-btn
                    @click="submit"
                    color="green"
                  >Update</v-btn>
                  <v-btn @click="clear">clear</v-btn>
                </form>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: { required, minLength: minLength(5) }
  },
  components: {
  },
  data: () => ({
    title: '',
    description: '',
    items: [],
    search: null
  }),

  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLength && errors.push('Title must be at least 5 characters long')
      !this.$v.title.required && errors.push('title is required.')
      return errors
    },
    user () {
      return this.$store.state.user
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$axios.put(`/questions/${this.$route.params.id}`, {
          title: this.title,
          description: this.description
        }, {
          headers: {
            token: this.user.token
          }
        })
          .then(({ data }) => {
            this.$swal('Success', 'Successfully update a question', 'success')
            this.$router.replace(`/questions/${this.$route.params.id}`)
          })
          .catch(({ response }) => {
            this.$swal('Failed', 'Failed to update a question', 'error')
          })
      }
    },
    clear () {
      this.$v.$reset()
      this.title = ''
      this.description = ''
    },
    getQuestion () {
      this.$axios.get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.title = data.title
          this.description = data.description
          if (this.user.id !== data.userId._id) {
            this.$router.replace('/questions')
          }
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  beforeMount () {
    this.getQuestion()
  },
  watch: {
    tags (val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tags.pop())
      }
    }
  }
}
</script>
