<template>
  <v-container>
    <v-flex>
      <v-list
        v-for="(tag, index) in tags"
        :key="index"
      >
        <v-list-tile>
          <v-list-title>
            {{ tag.name }}
          </v-list-title>
        </v-list-tile>

      </v-list>
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
