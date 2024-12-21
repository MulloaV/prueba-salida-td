<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="pizza in filteredPizzas"
        :key="pizza.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <card-component :pizza="pizza" />
      </v-col>

      <v-col v-if="filteredPizzas.length === 0" cols="12" class="text-center mt-12">
        <v-icon size="64" color="grey lighten-1">mdi-pizza-off</v-icon>
        <h2 class="text-h5 grey--text text--darken-1 mt-4">No se encontraron pizzas</h2>
        <p class="grey--text mt-2">Intenta con otro nombre</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CardComponent from '@/components/CardComponent.vue';

export default {
  name: 'PizzaView',
  components: {
    CardComponent
  },
  computed: {
    ...mapGetters(['filteredPizzas'])
  }
}
</script>

<style>
</style>
