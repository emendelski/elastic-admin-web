<template>
  <v-app id="app">
    <Home />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Home: () => import(/* webpackChunkName: 'Home' */ '@/components/Home.vue'),
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
</style>
