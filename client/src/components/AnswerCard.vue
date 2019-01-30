<template>
  <v-layout
    row
    class="mt-0"
  >
    <v-flex lg1>
      <v-layout
        align-center
        justify-center
        column
      >
        <v-flex>
          <v-icon
            size="75"
            @click="vote('upvote')"
            :disabled="disabled"
          >arrow_drop_up</v-icon>
        </v-flex>
        <v-flex>
          <span class="title">{{ votes.status }}</span>
        </v-flex>
        <v-flex>
          <v-icon
            size="75"
            @click="vote('downvote')"
            :disabled="disabled"
          >arrow_drop_down</v-icon>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg10>
      <v-card-text class="pt-0">
        <span
          class="text-xs-justify"
          v-html="answer.answer"
        >
        </span>
      </v-card-text>
      <v-card-actions>
        <v-menu
          offset-y
          v-if="isMine"
        >
          <v-btn
            slot="activator"
            color="error"
            dark
          >
            Actions
          </v-btn>
          <v-list>
            <v-list-tile
              @click="updateAnswer"
              color="warning"
            >
              <v-list-tile-title>Update</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              @click="deleteAnswer"
              color="error"
            >
              <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <span>answered by: {{ answer.userId.fullname}} @ {{ new Date(answer.createdAt).toLocaleString('id') }}</span>
      </v-card-actions>
    </v-flex>
    <UpdateAnswer :update="update" :answer="answer" :user="user" @update-answer="updateAnswerSuccess"></UpdateAnswer>
  </v-layout>
</template>

<script>
import UpdateAnswer from '@/components/UpdateAnswer'
export default {
  props: ['answer'],
  components: {
    UpdateAnswer
  },
  data () {
    return {
      update: false
    }
  },
  methods: {
    vote (status) {
      this.$axios.put(`/answers/${this.answer._id}/votes`, {
        status: status
      }, {
        headers: {
          token: this.user.token
        }
      })
        .then(({ data }) => {
          this.$emit('vote')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteAnswer () {
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
          this.$axios.delete(`/answers/${this.answer._id}`, {
            headers: {
              token: this.user.token
            }
          })
            .then(({ data }) => {
              this.$swal('Deleted', 'You successfully deleted an answer', 'success')
              this.$emit('update-answer')
            })
            .catch(({ response }) => {
              console.log(response)
            })
        }
      })
    },
    updateAnswer (id) {
      this.update = true
    },
    updateAnswerSuccess (status) {
      this.update = false
      this.$emit('update-answer')
    }
  },
  computed: {
    disabled () {
      if (this.user.token) {
        if (this.answer.votes && this.user.id === this.answer.userId._id) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    votes () {
      if (this.answer.votes && this.answer.votes.length) {
        return this.answer.votes.reduce((a, b) => {
          return {
            status: a.status + b.status
          }
        })
      } else {
        return { status: 0 }
      }
    },
    user () {
      return this.$store.state.user
    },
    isMine () {
      if (this.answer.userId && this.user.id === this.answer.userId._id) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
