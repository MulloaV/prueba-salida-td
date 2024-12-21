<template>
  <v-app>
    <nav-bar @update:filters="updateFilters"></nav-bar>
    
    <v-main>
      <router-view></router-view>
    </v-main>

    <footer-bar></footer-bar>

    <!-- Snackbar global -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'App',

  components: {
    NavBar,
    FooterBar
  },

  computed: {
    ...mapState(['snackbar'])
  }
}
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}

.v-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}
</style>