<template>
  <div class="indices-root">
    <table style="width: 100%">
      <thead>
        <tr>
          <th>Indices</th>
          <th>Shards</th>
          <th>Docs</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ statsIndicesCountText }}</td>
          <td>{{ shardCountText }}/{{ shardTotalCountText }}</td>
          <td>{{ totalDocCountText }}</td>
          <td>{{ totalHumanSize }}</td>
        </tr>
      </tbody>
    </table>
    <DebounceTextField
      v-if="statsIndices.length"
      v-model="search"
      debounce="1000"
      label="Indices filter"
    />

    <v-data-table
      :headers="statsIndicesHeaders"
      :items="statsIndices"
      :loading="loading"
      :search="search"
      hide-actions>
      <template slot="items" slot-scope="props">
        <tr :class="{ 'deleting': props.item.deleting }" :key="props.item.index">
          <td style="text-align: left">
            <span>{{ props.item.index }}</span>
            <v-btn @click.native="deleteIndex(props.item)" icon><v-icon>close</v-icon></v-btn>
          </td>
          <td>{{ props.item.docsText }}</td>
          <td>{{ props.item.humanSize }}</td>
          <td>{{ props.item.shards }}</td>
          <td>{{ props.item.replicas }}</td>
        </tr>
      </template>
    </v-data-table>
    <!-- change z-index for v-data-table loading bar -->
    <Dimmer :loading="loading" text="Loading ..." style="z-index: 1" />
  </div>
</template>

<script lang="ts">
import elastic from '@/elastic'
import humanSize from '@/util/humanSize'
import parseHash from '@/util/parseHash'
import { Component, Vue } from 'vue-property-decorator'

interface TypeIndex {
  index: string
  docs: number
  docsText: string
  size: number
  humanSize: string
  shards: number
  replicas: number
  deleting: boolean
}

@Component({
  components: {
    DebounceTextField: () => import(/* webpackChunkName: 'DebounceTextField' */ './DebounceTextField.vue'),
    Dimmer: () => import(/* webpackChunkName: 'Dimmer' */ './Dimmer.vue'),
  },
})
export default class Indices extends Vue {
  private loading: boolean = false
  private statsIndicesHeaders = [
    { text: 'Index', value: 'index' },
    { text: 'Docs', value: 'docs' },
    { text: 'Primary Size', value: 'size' },
    { text: 'Shards', value: 'shards' },
    { text: 'Replicas', value: 'replicas' },
  ]
  private statsIndices: TypeIndex[] = []
  private statsIndicesCountText: string = '0'
  private shardCountText: string = '0'
  private shardTotalCountText: string = '0'
  private totalDocCountText: string = '0'
  private totalHumanSize: string = '0'
  private search: string = ''

  public reloadStatsIndices() {
    this.loading = true
    return Promise
      .all([
        elastic.stats(),
        elastic.clusterState(),
      ])
      .then(([stats, clusterState]) => {
        this.shardCountText = Intl.NumberFormat().format(stats.data._shards.successful)
        this.shardTotalCountText = Intl.NumberFormat().format(stats.data._shards.total)
        this.totalDocCountText = Intl.NumberFormat().format(stats.data._all.total.docs.count)
        this.totalHumanSize = humanSize(stats.data._all.total.store.size_in_bytes)

        this.statsIndices = []
        for (const [name, index] of Object.entries(stats.data.indices)) {
          const idx = {} as TypeIndex
          idx.index = name
          idx.docs = index.total.docs.count
          idx.docsText = Intl.NumberFormat().format(idx.docs)
          idx.size = index.primaries.store.size_in_bytes
          idx.humanSize = humanSize(idx.size)
          idx.shards = clusterState.data.metadata.indices[name].settings.index.number_of_shards
          idx.replicas = clusterState.data.metadata.indices[name].settings.index.number_of_replicas
          idx.deleting = false
          this.statsIndices.push(idx)
        }
        this.statsIndicesCountText = Intl.NumberFormat().format(this.statsIndices.length)
      })
      .then(() => {
        this.loading = false
      })
  }

  private deleteIndex(idx: TypeIndex) {
    idx.deleting = true
    return elastic.deleteIndex(idx.index)
      .then(() => {
        this.statsIndices = this.statsIndices.filter((val) => val.index !== idx.index)
      })
  }

  private mounted() {
    if (parseHash().url) {
      this.reloadStatsIndices()
    }
  }
}
</script>

<style lang="stylus" scoped>
.indices-root
  position relative

.deleting
  background-color #ccc
  pointer-events none
</style>
