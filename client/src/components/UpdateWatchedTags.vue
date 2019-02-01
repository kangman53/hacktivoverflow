<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-container>

        <v-card-title class="headline">Update Watched Tags</v-card-title>
        <v-combobox
          v-model="selected"
          :items="list"
          :search-input.sync="search"
          hide-selected
          label="Add some tags"
          multiple
          persistent-hint
          small-chips
        >
        </v-combobox>
        <v-btn
          @click="update"
          color="green"
        >Update</v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['tags', 'user', 'dialog'],
  data () {
    return {
      selected: [],
      search: null
    }
  },
  computed: {
    list () {
      return this.tags.map(tag => {
        return tag.name
      })
    }
  },
  mounted () {
    this.selected = this.user.tags.map(tag => {
      return tag.name
    })
  },
  methods: {
    update () {
      this.$axios.post('/users/addtag', {
        tags: this.selected
      }, {
        headers: {
          token: this.user.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('updateTags', data)
          this.$emit('add-tag')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style>
</style>
