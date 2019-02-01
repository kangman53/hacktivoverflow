<template>
  <v-container>
    <v-flex>
      <v-list>
        <v-list-tile
          :to="{name: 'question-tag', params: {tagId: tag._id}}"
          v-for="(tag, index) in tags"
          :key="index"
        >
          <v-list-tile-action>
            <v-icon color="grey">label</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{ tag.name }}
          </v-list-tile-title>
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
  }
}
</script>
