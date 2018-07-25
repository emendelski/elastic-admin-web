<template>
  <v-btn class="version-root" :href="href" target="_blank">
    {{ version }}
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ElasticURL extends Vue {
  private version: string = process.env.VUE_APP_VERSION || 'elastic-admin-web'
  private href = 'https://github.com/tsaikd/elastic-admin-web'
}
</script>

<style lang="stylus" scoped>
</style>
