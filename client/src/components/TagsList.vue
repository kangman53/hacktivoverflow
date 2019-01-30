<template>
<v-container>

  <v-flex>

  </v-flex>
</v-container>
</template>

<script>
export default {
  computed: {
    tags () {
      return this.$store.state.tags
    }
  },
  mounted () {
    this.$store.dispatch('getTags')
  }
}
</script>
