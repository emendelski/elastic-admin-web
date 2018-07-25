<template>
  <div class="home-root">
    <AlertStatus />
    <div class="connect-bar eaw-flex eaw-center">
      <ElasticURL style="max-width: 400px" @connect="connectElastic" />
      <v-btn color="primary" @click.native="connectElastic" v-shortkey="['r']" @shortkey="connectElastic">Connect</v-btn>
      <v-btn @click.native="scrollIndices">Indices</v-btn>
      <v-btn @click.native="scrollSnapshot">Snapshot</v-btn>
    </div>
    <div class="data-container eaw-flex eaw-center eaw-column">
      <Indices ref="indices" />
      <Snapshot ref="snapshot" class="mt-5" />
    </div>
    <Version />
  </div>
</template>

<script lang="ts">
import elastic from '@/elastic'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    AlertStatus: () => import(/* webpackChunkName: 'AlertStatus' */ './AlertStatus.vue'),
    ElasticURL: () => import(/* webpackChunkName: 'ElasticURL' */ './ElasticURL.vue'),
    Indices: () => import(/* webpackChunkName: 'Indices' */ './Indices.vue'),
    Snapshot: () => import(/* webpackChunkName: 'Snapshot' */ './Snapshot.vue'),
    Version: () => import(/* webpackChunkName: 'Version' */ './Version.vue'),
  },
})
export default class Home extends Vue {
  private connectElastic() {
    location.hash = JSON.stringify({ url: elastic.url })
    const indices = this.$refs.indices as any
    indices.reloadStatsIndices()
    const snapshot = this.$refs.snapshot as any
    snapshot.reloadSnapshot()
  }

  private scrollIndices() {
    const indices = this.$refs.indices as Vue
    const top = indices.$el.offsetTop - 60
    window.scrollTo(0, top)
  }

  private scrollSnapshot() {
    const snapshot = this.$refs.snapshot as Vue
    const top = snapshot.$el.offsetTop - 60
    window.scrollTo(0, top)
  }
}
</script>

<style lang="stylus" scoped>
$connectBarHeight = 60px

.connect-bar
  position fixed
  width 100%
  height $connectBarHeight
  background-color #fafafa
  z-index 1

.data-container
  margin-top $connectBarHeight
</style>
