<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    max-width="300"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        v-bind="attrs"
        v-on="on"
        :color="isFilterActive ? 'green lighten-1' : ''"
      >
        <v-icon left>mdi-currency-usd</v-icon>
        {{ filterButtonText }}
      </v-btn>
    </template>

    <v-card class="pa-4">
      <v-card-title class="px-0 pt-0">
        Filtrar por precio
      </v-card-title>

      <v-range-slider
        v-model="priceRange"
        :min="minPrice"
        :max="maxPrice"
        class="mt-6"
        color="deep-orange"
        @change="applyFilter"
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="priceRange[0]"
            type="number"
            outlined
            dense
            hide-details
            class="mt-0 pt-0"
            style="width: 80px"
            @change="validateMin"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            v-model="priceRange[1]"
            type="number"
            outlined
            dense
            hide-details
            class="mt-0 pt-0"
            style="width: 80px"
            @change="validateMax"
          ></v-text-field>
        </template>
      </v-range-slider>

      <v-card-actions class="px-0 pb-0">
        <v-spacer></v-spacer>
        <v-btn
          text
          color="grey"
          @click="resetFilter"
        >
          Resetear
        </v-btn>
        <v-btn
          color="deep-orange"
          @click="applyFilter"
        >
          Aplicar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'PriceFilter',

  data: () => ({
    menu: false,
    minPrice: 0,
    maxPrice: 30000
  }),

  computed: {
    ...mapState(['priceFilter']),

    priceRange: {
      get() {
        return [this.priceFilter.min, this.priceFilter.max];
      },
      set(value) {
        this.SET_PRICE_FILTER({
          min: parseInt(value[0]),
          max: parseInt(value[1])
        });
      }
    },

    isFilterActive() {
      return this.priceFilter.min > this.minPrice || 
             this.priceFilter.max < this.maxPrice;
    },

    filterButtonText() {
      if (this.isFilterActive) {
        return `$${this.priceFilter.min.toLocaleString()} - $${this.priceFilter.max.toLocaleString()}`;
      }
      return 'Precio';
    }
  },

  methods: {
    ...mapMutations(['SET_PRICE_FILTER']),

    validateMin() {
      let min = parseInt(this.priceRange[0]);
      if (isNaN(min) || min < this.minPrice) min = this.minPrice;
      if (min > this.priceRange[1]) min = this.priceRange[1];
      this.priceRange = [min, this.priceRange[1]];
    },

    validateMax() {
      let max = parseInt(this.priceRange[1]);
      if (isNaN(max) || max > this.maxPrice) max = this.maxPrice;
      if (max < this.priceRange[0]) max = this.priceRange[0];
      this.priceRange = [this.priceRange[0], max];
    },

    applyFilter() {
      this.menu = false;
    },

    resetFilter() {
      this.SET_PRICE_FILTER({
        min: this.minPrice,
        max: this.maxPrice
      });
      this.menu = false;
    }
  }
}
</script>
