<template>
  <v-flex lg10 offset-lg1>
    <span class="title font-weight-bolder">Answer</span>
    <wysiwyg v-model="answer"></wysiwyg>
    <v-btn color="primary" @click="submit">Answer</v-btn>
  </v-flex>
</template>

<script>
export default {
  props: ['questionid'],
  data () {
    return {
      answer: ''
    }
  },
  methods: {
    submit () {
      this.$axios.post(`/answers/${this.questionid}`, {
        answer: this.answer
      }, {
        headers: {
          token: this.user.token
        }
      })
        .then(({ data }) => {
          this.$swal('Success', 'Successfully post an answer', 'success')
          this.answer = ''
          this.$emit('add-answer')
        })
        .catch(({ response }) => {
          this.$swal('Failed', 'Failed to post an answer', 'error')
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
