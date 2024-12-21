<template>
  <v-footer
    dark
    padless
    class="mt-16"
  >
    <v-card
      flat
      tile
      width="100%"
      class="black darken-4 text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>



      <v-card-text class="white--text pt-0">
        <v-row justify="center" class="mb-2">
          <v-btn
            v-for="link in links"
            :key="link.text"
            color="white"
            text
            rounded
            class="my-2"
            to="/"
          >
            {{ link.text }}
          </v-btn>
        </v-row>
        
        <div>Everto: esto es un footer no funcional, ya que, la prueba pidió mockup solamente, las rutas del footer las dejé todas al inicio de la app </div>
        
        <v-row justify="center" class="mt-4">
          <span>&copy; {{ new Date().getFullYear() }} — </span>
          <strong class="ml-1">Seba Ulloa</strong>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBar',

  data: () => ({
    icons: [
      { icon: 'mdi-facebook' },
      { icon: 'mdi-twitter' },
      { icon: 'mdi-instagram' },
      { icon: 'mdi-youtube' }
    ],
    links: [
      { text: 'Inicio' },
      { text: 'Acerca de' },
      { text: 'Menú' },
      { text: 'Contacto' }
    ]
  })
}
</script>
