<template>
  <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Buscar pizza"
    placeholder="Ej: Napolitana"
    single-line
    hide-details
    class="mx-4"
    style="max-width: 300px;"
    @input="onSearch"
    clearable
    dense
  ></v-text-field>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SearchBar',

  data: () => ({
    searchTimeout: null
  }),

  computed: {
    search: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.SET_SEARCH_TERM(value);
      }
    }
  },

  methods: {
    ...mapMutations(['SET_SEARCH_TERM']),
    
    onSearch(value) {
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.SET_SEARCH_TERM(value);
      }, 300);
    }
  }
}
</script>
