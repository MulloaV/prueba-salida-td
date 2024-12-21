<template>
  <v-card class="mx-auto pizza-card" max-width="350">
    <div class="image-container">
      <v-img
        :src="getPizzaImage(pizza)"
        height="200"
        class="pizza-image"
      >
        <div class="image-overlay">
          <v-fade-transition>
            <div class="pizza-name-overlay text-h6">
              {{ capitalizedName }}
            </div>
          </v-fade-transition>
        </div>
      </v-img>
    </div>

    <v-card-title class="pb-0 text-h6 font-weight-bold">
      {{ capitalizedName }}
    </v-card-title>

    <v-card-text>
      <div class="text-h6 primary--text font-weight-bold">
        $ {{ pizza.price.toLocaleString() }}
      </div>
      <div class="ingredients-list">
        {{ capitalizedIngredients.join(', ') }}
      </div>
    </v-card-text>

    <v-card-actions class="pb-4 px-2">
      <v-btn
        text
        color="info"
        @click="dialog = true"
        class="text-capitalize button-hover"
        elevation="0"
        small
      >
        Vista Rápida
        <v-icon right small>mdi-eye</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click.stop="addToCartWithFeedback(pizza)"
        class="text-capitalize button-hover"
        elevation="0"
        small
      >
        Agregar
        <v-icon right small>mdi-cart</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- Modal de Vista Rápida -->
    <v-dialog
      v-model="dialog"
      max-width="800px"
      @click:outside="resetQuantity"
    >
      <v-card class="modal-card">
        <v-card-title class="headline primary white--text py-3">
          <v-icon large color="white" class="mr-3">mdi-pizza</v-icon>
          {{ capitalizedName }}
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-row class="ma-0">
          <v-col cols="12" md="6" class="pa-0">
            <v-img
              :src="getPizzaImage(pizza)"
              height="400"
              class="pizza-detail-image"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>

          <v-col cols="12" md="6" class="pa-6">
            <h3 class="mb-2 info--text">Descripción</h3>
            <p class="text-body-1">{{ pizza.desc }}</p>

            <h3 class="mb-2 mt-4 info--text">Ingredientes</h3>
            <div class="mb-2">
              <v-chip
                v-for="ingredient in capitalizedIngredients"
                :key="ingredient"
                class="mr-1 mb-1"
                small
                outlined
              >
                {{ ingredient }}
              </v-chip>
            </div>

            <h3 class="mb-2 mt-4 info--text">Precio</h3>
            <p class="text-h4 primary--text font-weight-bold">
              $ {{ pizza.price.toLocaleString() }}
            </p>

            <div class="mt-4">
              <div class="d-flex align-center mb-4">
                <h3 class="info--text mb-0 mr-4">Cantidad</h3>
                <v-btn
                  icon
                  small
                  :disabled="quantity <= 0"
                  @click="quantity--"
                  class="mr-2"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="text-h6">{{ quantity }}</span>
                <v-btn
                  icon
                  small
                  @click="quantity++"
                  class="ml-2"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>

              <div class="d-flex">
                <v-btn
                  color="primary"
                  block
                  :disabled="quantity <= 0"
                  class="mr-2"
                  @click="addToCartFromDetail"
                >
                  <span class="text-h6">
                    Agregar {{ quantity > 0 ? quantity : '' }} al carrito
                  </span>
                  <v-icon right>mdi-cart</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PizzaCard',
  
  props: {
    pizza: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      quantity: 1
    }
  },

  computed: {
    capitalizedName() {
      return this.pizza.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    },
    capitalizedIngredients() {
      return this.pizza.ingredients.map(ingredient => 
        ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
      )
    }
  },

  methods: {
    ...mapActions(['addToCart']),
    
    getPizzaImage(pizza) {
      try {
        return require(`@/assets/pizzas/${pizza.img}`);
      } catch (e) {
        return 'https://via.placeholder.com/150?text=No+disponible';
      }
    },

    addToCartWithFeedback(pizza) {
      this.addToCart(pizza);
      this.$emit('item-added');
      
      this.$store.commit('SET_SNACKBAR', {
        show: true,
        text: `${this.capitalizedName} agregado al carrito`,
        color: 'success'
      });
    },

    addToCartFromDetail() {
      if (this.quantity <= 0) return;

      // Agregar la pizza al carrito la cantidad de veces especificada
      for (let i = 0; i < this.quantity; i++) {
        this.addToCart(this.pizza);
      }
      
      // Mostrar notificación
      this.$store.commit('SET_SNACKBAR', {
        show: true,
        text: `${this.quantity} ${this.capitalizedName}${this.quantity > 1 ? 's' : ''} agregada${this.quantity > 1 ? 's' : ''} al carrito`,
        color: 'success'
      });

      // Cerrar el diálogo y resetear la cantidad
      this.closeDialog();
    },

    closeDialog() {
      this.dialog = false;
      this.resetQuantity();
    },

    resetQuantity() {
      this.quantity = 1;
    }
  }
}
</script>

<style scoped>
.pizza-card {
  transition: transform 0.2s;
  position: relative;
}

.pizza-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.pizza-image {
  transition: transform 0.3s;
}

.pizza-card:hover .pizza-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
  display: flex;
  align-items: flex-end;
  padding: 16px;
}

.pizza-name-overlay {
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}

.ingredients-list {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  text-transform: capitalize;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.button-hover {
  transition: background-color 0.2s;
}

.button-hover:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.pizza-detail-image {
  border-radius: 0;
  height: 100%;
}

@media (max-width: 960px) {
  .pizza-detail-image {
    height: 300px;
  }
}
</style>
