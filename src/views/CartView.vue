<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-6">Carrito de Compras</h1>

    <v-row v-if="cartItems.length">
      <v-col cols="12" md="8">
        <v-card>
          <v-list>
            <v-list-item
              v-for="(item, index) in cartItems"
              :key="index"
              class="mb-2"
            >
              <v-list-item-avatar
                tile
                size="80"
              >
                <v-img :src="getPizzaImage(item)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ capitalizedName(item) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.ingredients.join(', ') }}
                </v-list-item-subtitle>
                <div class="d-flex align-center mt-2">
                  <v-btn
                    icon
                    small
                    @click="decrementQuantity(item)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-3">{{ item.quantity }}</span>
                  <v-btn
                    icon
                    small
                    @click="incrementQuantity(item)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="red"
                    class="ml-4"
                    @click="removeItem(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-list-item-content>

              <v-list-item-action class="text-right">
                <div class="text-subtitle-1 mb-1">Precio unitario:</div>
                <div class="text-h6 primary--text">$ {{ item.price.toLocaleString() }}</div>
                <div class="text-subtitle-1 mt-2">Subtotal:</div>
                <div class="text-h6 primary--text">$ {{ (item.price * item.quantity).toLocaleString() }}</div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-h5 mb-4">Resumen del Pedido</h2>
          
          <div class="d-flex justify-space-between mb-2">
            <span>Subtotal ({{ totalItems }} items)</span>
            <span>$ {{ cartTotal.toLocaleString() }}</span>
          </div>
          
          <div class="d-flex justify-space-between mb-4">
            <span>Envío</span>
            <span class="success--text">Gratis</span>
          </div>
          
          <v-divider class="mb-4"></v-divider>
          
          <div class="d-flex justify-space-between mb-6">
            <span class="text-h6">Total</span>
            <span class="text-h6 primary--text">$ {{ cartTotal.toLocaleString() }}</span>
          </div>

          <v-btn
            color="primary"
            x-large
            block
            @click="showPaymentDialog = true"
            :disabled="processingPayment"
          >
            <v-icon left>mdi-cash-register</v-icon>
            Proceder al Pago
          </v-btn>

          <v-btn
            text
            block
            class="mt-4"
            to="/"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Seguir Comprando
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else justify="center" align="center" style="height: 400px;">
      <v-col cols="12" class="text-center">
        <v-icon
          size="100"
          color="grey lighten-1"
        >
          mdi-cart-outline
        </v-icon>
        <h2 class="text-h5 grey--text text--darken-1 mt-4">
          Tu carrito está vacío
        </h2>
        <v-btn
          color="primary"
          class="mt-4"
          to="/"
        >
          Ver Menú
        </v-btn>
      </v-col>
    </v-row>

    <!-- Modal de Pago -->
    <v-dialog
      v-model="showPaymentDialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline primary white--text">
          Confirmar Pedido
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="showPaymentDialog = false"
            :disabled="processingPayment"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-4">
          <p class="text-body-1">¿Deseas confirmar tu pedido por el monto de:</p>
          <p class="text-h4 primary--text text-center my-4">
            $ {{ cartTotal.toLocaleString() }}
          </p>
          <p class="text-body-2 grey--text text-center">
            Este es un simulador de compra, no se realizará ningún cargo real.
          </p>
        </v-card-text>

        <v-card-actions class="pb-4 px-4">
          <v-btn
            text
            :disabled="processingPayment"
            @click="showPaymentDialog = false"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="processingPayment"
            @click="processPayment"
          >
            Confirmar Pedido
            <v-icon right>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartView',

  data() {
    return {
      showPaymentDialog: false,
      processingPayment: false
    }
  },

  computed: {
    ...mapState(['snackbar']),
    ...mapGetters(['cartItems', 'cartTotal']),

    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    }
  },

  methods: {
    ...mapActions(['removeFromCart', 'clearCart']),

    getPizzaImage(pizza) {
      try {
        return require(`@/assets/pizzas/${pizza.img}`)
      } catch (e) {
        return 'https://via.placeholder.com/150?text=No+disponible'
      }
    },

    capitalizedName(pizza) {
      return pizza.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    },

    incrementQuantity(item) {
      this.$store.dispatch('addToCart', item)
    },

    decrementQuantity(item) {
      this.$store.dispatch('removeFromCart', { pizzaId: item.id })
    },

    removeItem(item) {
      this.$store.dispatch('removeFromCart', { pizzaId: item.id, removeAll: true })
      
      this.$store.commit('SET_SNACKBAR', {
        show: true,
        text: `${this.capitalizedName(item)} eliminado del carrito`,
        color: 'info'
      })
    },

    async processPayment() {
      this.processingPayment = true

      try {
        // Simulamos un delay de procesamiento
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Pago exitoso
        this.showPaymentDialog = false
        this.clearCart()
        this.$store.commit('SET_SNACKBAR', {
          show: true,
          text: '¡Pedido confirmado! Gracias por tu compra.',
          color: 'success'
        })
        this.$router.push('/')
      } finally {
        this.processingPayment = false
      }
    }
  }
}
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.v-list-item:last-child {
  border-bottom: none;
}
</style>