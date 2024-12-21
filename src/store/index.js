// Importación de dependencias necesarias
import Vue from 'vue'
import Vuex from 'vuex'
import pizzas from '@/data/pizzas.json'

// Instalar Vuex como plugin de Vue
Vue.use(Vuex)

// Configuración del store de Vuex
export default new Vuex.Store({
  // Estado inicial de la aplicación
  state: {
    // Catálogo completo de pizzas
    pizzas: pizzas,
    // Pizzas filtradas
    filteredPizzas: pizzas,
    // Items en el carrito
    cart: [],
    // Estado del snackbar para notificaciones
    snackbar: {
      show: false,
      text: '',
      color: 'success'
    },
    // Término de búsqueda actual
    searchTerm: '',
    // Rango de precios para filtrar pizzas
    priceRange: [0, 15000],
    // Filtros activos
    activeFilters: {
      ingredients: [],
      priceRange: [0, 15000]
    }
  },

  getters: {
    // Obtener todas las pizzas
    pizzas: state => state.pizzas,

    // Obtener pizzas filtradas por término de búsqueda y precio
    filteredPizzas: state => state.filteredPizzas,

    // Obtener items del carrito
    cartItems: state => {
      // Agrupamos los items por ID y calculamos sus cantidades
      const groupedItems = state.cart.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = {
            ...item,
            quantity: 1
          }
        } else {
          acc[item.id].quantity++
        }
        return acc
      }, {})

      // Convertimos el objeto agrupado en un array
      return Object.values(groupedItems)
    },

    // Obtener cantidad total de items en el carrito
    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    // Obtener total del carrito
    cartTotal: (state, getters) => {
      return getters.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },

    // Obtener estado del snackbar
    snackbar: state => state.snackbar
  },

  mutations: {
    // Actualizar término de búsqueda
    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term;
    },

    // Actualizar filtro de precios
    SET_PRICE_FILTER(state, range) {
      state.priceRange = range;
    },

    // Actualizar estado del snackbar
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    },

    // Agregar item al carrito
    ADD_TO_CART(state, pizza) {
      state.cart.push({
        ...pizza,
        quantity: 1
      })
    },

    // Remover item del carrito
    REMOVE_FROM_CART(state, { pizzaId, removeAll = false }) {
      if (removeAll) {
        state.cart = state.cart.filter(item => item.id !== pizzaId)
      } else {
        const index = state.cart.findIndex(item => item.id === pizzaId)
        if (index > -1) {
          state.cart.splice(index, 1)
        }
      }
    },

    // Actualizar cantidad de un item
    UPDATE_QUANTITY(state, { pizzaId, quantity }) {
      const item = state.cart.find(item => item.id === pizzaId);
      if (item) {
        item.quantity = quantity;
      }
    },

    // Limpiar carrito
    CLEAR_CART(state) {
      state.cart = [];
    },

    // Actualizar pizzas filtradas
    SET_FILTERED_PIZZAS(state, pizzas) {
      state.filteredPizzas = pizzas;
    },

    // Actualizar filtros activos
    SET_ACTIVE_FILTERS(state, filters) {
      state.activeFilters = filters
    }
  },

  // Actions para operaciones asíncronas
  actions: {
    // Agregar al carrito
    addToCart({ commit }, pizza) {
      commit('ADD_TO_CART', pizza);
    },

    // Remover del carrito
    removeFromCart({ commit }, payload) {
      commit('REMOVE_FROM_CART', payload);
    },

    // Actualizar cantidad
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload);
    },

    // Limpiar carrito
    clearCart({ commit }) {
      commit('CLEAR_CART');
    }
  }
})
