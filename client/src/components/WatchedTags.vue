<template>
    <v-menu offset-y flat>
      <v-btn
        slot="activator"
        class="white--text"
        color="#9D9C9D"
      >
      <v-icon>visibility</v-icon>
      <span class="ml-2">
        Watched Tags
      </span>
      <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(tag, index) in myTags"
          :key="index"
          :to="{name: 'question-tag', params: {tagId: tag._id}}"
        >
          <v-list-tile-title>{{ tag.name }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile color="warning" @click="edit">
          <v-list-tile-action>
            <v-icon color="grey">edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Edit Tags
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <UpdateWatchedTags :tags="tags" :user="user" :dialog="dialog" @add-tag="addTag" />
    </v-menu>
</template>

<script>
import UpdateWatchedTags from '@/components/UpdateWatchedTags'
export default {
  props: ['user'],
  components: {
    UpdateWatchedTags
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    myTags () {
      return this.user.tags
    },
    tags () {
      return this.$store.state.tags
    }
  },
  methods: {
    edit () {
      this.dialog = true
    },
    addTag () {
      this.dialog = false
    }
  }
}
</script>
