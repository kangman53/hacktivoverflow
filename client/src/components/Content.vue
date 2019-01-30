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
    this.$store.dispatch('getQuestions')
  },
  computed: {
  }
}
</script>
