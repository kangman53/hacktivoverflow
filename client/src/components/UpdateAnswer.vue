<template>
  <v-dialog
    v-model="update"
    max-width="600"
  >
    <v-card>
      <v-container>
        <span class="title font-weight-bolder">Edit Answer</span>
        <wysiwyg v-model="answer.answer"></wysiwyg>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="cancelUpdate"
          >
            cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="updateAnswer"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['update', 'answer', 'user'],
  methods: {
    updateAnswer () {
      this.$axios.put(`/answers/${this.answer._id}`, {
        answer: this.answer.answer
      }, {
        headers: {
          token: this.user.token
        }
      })
        .then(({ data }) => {
          this.$swal('Success', 'Successfully update an answer', 'success')
          this.$emit('update-answer')
        })
        .catch(({ response }) => {
          this.$swal('Failed', 'Failed to update an answer', 'error')
        })
    },
    cancelUpdate () {
      this.$emit('update-answer')
    }
  }
}
</script>
