<template>
  <v-text-field
    class="elastic-url-root"
    v-model="url"
    label="Elastic URL"
    @keypress.enter="connect"
    hide-details
    required
  />
</template>

<script lang="ts">
import elastic from '@/elastic'
import parseHash from '@/util/parseHash'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ElasticURL extends Vue {
  private url: string = elastic.url

  private connect() {
    this.$emit('connect')
  }

  @Watch('url')
  private onURLChanged(value: string) {
    elastic.url = value
  }

  private created() {
    const hashObj = parseHash()
    if (hashObj.url) {
      this.url = hashObj.url
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
