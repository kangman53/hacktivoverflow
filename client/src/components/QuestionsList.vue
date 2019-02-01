<template>
  <v-flex>
    <v-card full-width>
      <v-container>
        <v-layout column>
          <v-flex
            v-for="(question, index) in questions"
            :key="index"
          >
            <v-layout row>
              <v-flex lg1>
                <v-layout
                  column
                  align-center
                >
                  <v-flex>
                    <span class="font-weight-bolder title">{{ votes(index).status }}</span>
                  </v-flex>
                  <v-flex>
                    <span class="caption">votes</span>
                  </v-flex>
                  <v-flex>
                    <span class="font-weight-bolder title">{{ answers(index) }}</span>
                  </v-flex>
                  <v-flex>
                    <span class="caption">answers</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex lg10>
                <v-card flat>
                  <v-card-title class="pt-0 title">
                    <router-link
                      :to="{ name: 'question-detail', params: { id: question._id }}"
                      style="text-decoration: none"
                    >{{ question.title }}</router-link>
                  </v-card-title>
                  <v-card-actions class="py-0">
                    <v-item-group multiple>
                      <v-item
                        v-for="(tag, n) in question.tags"
                        :key="n"
                      >
                        <v-chip
                          label
                          outline
                          slot-scope="{  }"
                        >
                        <router-link :to="{name: 'question-tag', params: {tagId: tag._id}}" style="text-decoration: none">
                        {{ tag.name }}
                        </router-link>
                        </v-chip>
                      </v-item>
                    </v-item-group>
                    <v-spacer></v-spacer>
                    <span>asked by: {{ question.userId.fullname}} @ {{ new Date(question.createdAt).toLocaleString('id') }}</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
            <v-divider
              :key="index"
              class="my-3"
            ></v-divider>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    votes (index) {
      if (this.questions[index].votes.length) {
        return this.questions[index].votes.reduce((a, b) => {
          return {
            status: a.status + b.status
          }
        })
      } else {
        return { status: 0 }
      }
    },
    answers (index) {
      return this.questions[index].answers.length
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>
