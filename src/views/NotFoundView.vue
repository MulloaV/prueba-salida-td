<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
        <v-img
          :src="require('@/assets/404/notfound.png')"
          contain
          height="500"
          class="mb-6"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="deep-orange darken-4"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        
        <h1 class="text-h3 mb-2 deep-orange--text text--darken-4">¡Oops!</h1>
        <h2 class="text-h5 mb-4 grey--text text--darken-1">
          La página que buscas no existe
        </h2>
        <p class="mb-6 grey--text text--darken-2">
          Parece que esta pizza se perdió en el horno. ¿Qué tal si volvemos al menú principal?
        </p>
        <v-btn
          color="deep-orange darken-4"
          dark
          rounded
          to="/"
          class="px-6 elevation-2"
        >
          <v-icon left>mdi-pizza</v-icon>
          Volver al Menú
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.v-btn {
  transition: transform 0.2s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .v-img {
    height: 200px !important;
  }
}
</style>
