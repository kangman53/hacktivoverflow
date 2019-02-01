<template>
  <v-container
    fluid
    fill-height
    class="grey lighten-4"
  >
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="title">
            <router-link
              style="text-decoration: none"
              :to="{ name: 'question-detail', params: { id: question._id }}"
            >{{ question.title }}</router-link>
          </v-card-title>
          <v-divider class="my-3"></v-divider>
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
                  v-html="question.description"
                >
                </span>
              </v-card-text>
              <v-card-actions class="py-0">
                <v-item-group multiple>
                  <v-item
                    v-for="(tag, n) in question.tags"
                    :key="n"
                  >
                    <v-chip
                      :to="{name: 'question-tag', params: {tagId: tag._id}}"
                      label
                      outline
                      slot-scope="{  }"
                    >
                      <router-link
                        :to="{name: 'question-tag', params: {tagId: tag._id}}"
                        style="text-decoration: none"
                      >
                        {{ tag.name }}
                      </router-link>
                    </v-chip>
                  </v-item>
                </v-item-group>
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
                      :to="{name:'updateQuestion', param: {id: question._id}}"
                      color="warning"
                    >
                      <v-list-tile-title>Update</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      @click="deleteQuestion"
                      color="error"
                    >
                      <v-list-tile-title>Delete</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <span>asked by: {{ question.userId ? question.userId.fullname : ''}} @ {{ new Date(question.createdAt).toLocaleString('id') }}</span>
              </v-card-actions>
            </v-flex>
          </v-layout>
          <v-divider class="my-3"></v-divider>
          <AddAnswer
            v-if="user.token"
            :questionid="question._id"
            @add-answer="addAnswer"
          ></AddAnswer>
          <span class="subheading font-weight-black ml-3 mb-5">Answers</span>
          <v-flex
            v-for="(answer, i) in question.answers"
            :key="i"
          >
            <AnswerCard
              :answer="answer"
              @vote="voteAnswer"
              @update-answer="voteAnswer"
            ></AnswerCard>
            <v-divider class="my-3"></v-divider>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddAnswer from '@/components/AddAnswer'
import AnswerCard from '@/components/AnswerCard'

export default {
  components: {
    AddAnswer,
    AnswerCard
  },
  data () {
    return {
      question: {}
    }
  },
  methods: {
    vote (status) {
      this.$axios.put(`/questions/${this.question._id}/votes`, {
        status: status
      }, {
        headers: {
          token: this.user.token
        }
      })
        .then(({ data }) => {
          this.getAll()
          console.log(data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getAll () {
      this.$axios.get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    voteAnswer () {
      this.getAll()
    },
    addAnswer () {
      this.getAll()
    },
    deleteQuestion () {
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
          this.$axios.delete(`/questions/${this.question._id}`,
            {
              headers: {
                token: this.user.token
              }
            })
            .then(({ data }) => {
              this.$swal('Deleted', 'You successfully deleted a question', 'success')
              this.$router.replace('/questions')
            })
            .catch(({ response }) => {
              this.$swal('Error', 'Error while deleted a question', 'error')
            })
        }
      })
    }
  },
  computed: {
    votes () {
      if (this.question.votes && this.question.votes.length) {
        return this.question.votes.reduce((a, b) => {
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
    disabled () {
      if (this.user.token) {
        if (this.question.votes && this.user.id === this.question.userId._id) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    isMine () {
      if (this.question.userId && this.user.id === this.question.userId._id) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>
