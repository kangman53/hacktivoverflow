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
                Post a question
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
                  <v-combobox
                    v-model="tags"
                    :items="items"
                    :search-input.sync="search"
                    hide-selected
                    hint="Maximum of 5 tags"
                    label="Add some tags"
                    multiple
                    persistent-hint
                    small-chips
                  >
                    <template slot="no-data">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-combobox>
                  <v-btn
                    @click="submit"
                    color="green"
                  >submit</v-btn>
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
    tags: null,
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
        this.$axios.post('/questions', {
          title: this.title,
          description: this.description,
          tags: this.tags
        }, {
          headers: {
            token: this.user.token
          }
        })
          .then(({ data }) => {
            this.$swal('Success', 'Successfully post a question', 'success')
            this.clear()
            this.$router.replace('/questions')
          })
          .catch(({ response }) => {
            this.$swal('Failed', 'Failed to post a question', 'error')
            console.log(response)
          })
      }
    },
    clear () {
      this.$v.$reset()
      this.title = ''
      this.description = ''
      this.tags = null
    },
    getItems () {
      this.$axios.get('/tags')
        .then(({ data }) => {
          this.items = data.map(d => d.name)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }

  },
  mounted () {
    this.getItems()
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
