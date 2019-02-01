<template>
  <v-container fluid fill-height class="grey lighten-4">
    <v-layout>
      <QuestionsList></QuestionsList>
    </v-layout>
  </v-container>
</template>

<script>
import QuestionsList from '@/components/QuestionsList'
export default {
  components: {
    QuestionsList
  },
  data () {
    return {

    }
  },
  mounted () {
    if (this.$route.params.tagId) {
      this.$store.dispatch('getQuestionsByTag', this.$route.params.tagId)
    } else {
      this.$store.dispatch('getQuestions')
    }
  },
  watch: {
    '$route' () {
      if (this.$route.params.tagId) {
        this.$store.dispatch('getQuestionsByTag', this.$route.params.tagId)
      } else {
        this.$store.dispatch('getQuestions')
      }
    }
  }
}
</script>
