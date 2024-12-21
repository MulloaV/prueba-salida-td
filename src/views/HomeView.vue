<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold deep-orange--text text--darken-3 mb-2">
          <v-icon large color="deep-orange darken-2" class="mr-3">mdi-pizza</v-icon>
          Nuestras Pizzas
        </h1>
        <v-divider class="mx-auto my-4" width="100" color="deep-orange"></v-divider>
        <p class="text-subtitle-1 grey--text text--darken-1">
          Descubre nuestra selección de deliciosas pizzas artesanales
        </p>
      </v-col>
    </v-row>

    <nav-bar @update:filters="applyFilters"></nav-bar>
    
    <v-row>
      <v-col
        v-for="pizza in filteredPizzas"
        :key="pizza.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <pizza-card
          :pizza="pizza"
          @item-added="showSnackbar"
        ></pizza-card>
      </v-col>

      <!-- Mensaje cuando no hay resultados -->
      <v-col v-if="filteredPizzas.length === 0" cols="12" class="text-center">
        <v-alert
          type="info"
          outlined
        >
          No se encontraron pizzas que coincidan con los filtros seleccionados.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Snackbar para notificaciones -->
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import PizzaCard from '@/components/PizzaCard.vue'

export default {
  name: 'HomeView',

  components: {
    NavBar,
    PizzaCard
  },

  computed: {
    ...mapState(['filteredPizzas', 'snackbar'])
  },

  methods: {
    showSnackbar(text) {
      this.$store.commit('SET_SNACKBAR', {
        show: true,
        text,
        color: 'success'
      })
    }
  }
}
</script>
