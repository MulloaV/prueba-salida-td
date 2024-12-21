<template>
  <v-app-bar app color="black darken-4" dark>
    <v-toolbar-title class="text-uppercase font-weight-bold">
      La Gran Pizzeria de TD 
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/" class="text-none">
      <v-icon left>mdi-pizza</v-icon>
      Menú
    </v-btn>

    <!-- Filtros -->
    <v-menu
      v-model="showFilters"
      :close-on-content-click="false"
      offset-y
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
          class="text-none"
        >
          <v-icon left>mdi-filter</v-icon>
          Filtros
          <v-icon right v-if="hasActiveFilters" small color="green">mdi-check-circle</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h6">
          Filtrar Pizzas
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="clearFilters"
            v-if="hasActiveFilters"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <!-- Rango de precio -->
          <v-subheader>Rango de Precio</v-subheader>
          <v-range-slider
            v-model="priceRange"
            :min="minPrice"
            :max="maxPrice"
            :step="100"
            class="mt-4"
            hide-details
            @end="updateFilters"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="formatPrice(priceRange[0])"
                class="mt-0 pt-0"
                dense
                hide-details
                readonly
                style="width: 80px"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="formatPrice(priceRange[1])"
                class="mt-0 pt-0"
                dense
                hide-details
                readonly
                style="width: 80px"
              ></v-text-field>
            </template>
          </v-range-slider>

          <!-- Ingredientes -->
          <v-subheader class="mt-4">Ingredientes</v-subheader>
          <v-combobox
            v-model="selectedIngredients"
            :items="availableIngredients"
            label="Seleccionar ingredientes"
            multiple
            chips
            small-chips
            deletable-chips
            hide-selected
            @change="updateFilters"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                small
                @click="select"
                @click:close="removeIngredient(item)"
              >
                {{ item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-card-text>
      </v-card>
    </v-menu>

    <div class="d-flex align-center">
      <v-btn text to="/cart" class="text-none">
        <v-badge
          :content="cartItemCount"
          :value="cartItemCount"
          color="green"
          offset-x="10"
          offset-y="10"
        >
          <v-icon left>mdi-cart</v-icon>
        </v-badge>
        <span class="ml-2">Detalle de compra</span>
      </v-btn>
    </div>

    <span class="text-subtitle-2 mr-2">Total:</span>
    <span class="text-h6 green--text text--lighten-1">${{ cartTotal.toLocaleString() }}</span>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'NavBar',

  data() {
    return {
      showFilters: false,
      selectedIngredients: [],
      priceRange: [0, 15000],
      minPrice: 0,
      maxPrice: 15000
    }
  },

  computed: {
    ...mapState(['pizzas']),
    ...mapGetters(['cartTotal', 'cartItemCount']),

    availableIngredients() {
      const ingredients = new Set()
      this.pizzas.forEach(pizza => {
        pizza.ingredients.forEach(ingredient => {
          ingredients.add(this.capitalizeFirst(ingredient))
        })
      })
      return Array.from(ingredients).sort()
    },

    hasActiveFilters() {
      return this.selectedIngredients.length > 0 ||
             this.priceRange[0] > this.minPrice ||
             this.priceRange[1] < this.maxPrice
    },

    filteredPizzas() {
      return this.pizzas.filter(pizza => {
        // Filtro por precio
        const priceInRange = pizza.price >= this.priceRange[0] &&
                            pizza.price <= this.priceRange[1]

        // Filtro por ingredientes (debe contener AL MENOS UNO de los ingredientes seleccionados)
        const hasIngredients = this.selectedIngredients.length === 0 ||
                             this.selectedIngredients.some(selectedIng => 
                               pizza.ingredients.some(pizzaIng => 
                                 this.capitalizeFirst(pizzaIng) === selectedIng
                               )
                             )

        return priceInRange && hasIngredients
      })
    }
  },

  created() {
    if (this.pizzas.length) {
      this.minPrice = Math.floor(Math.min(...this.pizzas.map(p => p.price)))
      this.maxPrice = Math.ceil(Math.max(...this.pizzas.map(p => p.price)))
      this.priceRange = [this.minPrice, this.maxPrice]
    }
  },

  methods: {
    ...mapMutations(['SET_FILTERED_PIZZAS']),

    formatPrice(value) {
      return `$${value.toLocaleString()}`
    },

    capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    },

    removeIngredient(ingredient) {
      this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient)
      this.updateFilters()
    },

    clearFilters() {
      this.selectedIngredients = []
      this.priceRange = [this.minPrice, this.maxPrice]
      this.updateFilters()
    },

    updateFilters() {
      this.SET_FILTERED_PIZZAS(this.filteredPizzas)
    }
  },

  watch: {
    filteredPizzas: {
      immediate: true,
      handler(newPizzas) {
        this.SET_FILTERED_PIZZAS(newPizzas)
      }
    }
  }
}
</script>

<style scoped>
.v-btn.text-none {
  text-transform: none;
  letter-spacing: normal;
}

.v-text-field >>> input {
  text-align: center;
}
</style>
