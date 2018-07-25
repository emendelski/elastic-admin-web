<template>
  <div class="snapshot-root">
    <v-select
      label="Snapshot repository"
      v-model="selectRepoName"
      :items="repoItemsForSelect"
      hide-details
    />
    <DebounceTextField
      v-if="snapshots.length"
      v-model="search"
      debounce="1000"
      label="Snapshot filter"
    />

    <v-data-table
      :headers="snapshotHeaders"
      :items="snapshots"
      :loading="loading"
      :search="search"
      hide-actions>
      <template slot="items" slot-scope="props">
        <tr :class="{ 'deleting': props.item.deleting }" :key="props.item.snapshot">
          <td style="text-align: left">
            <span>{{ props.item.snapshot }}</span>
            <v-btn @click.native="deleteSnapshot(selectRepoName, props.item)" icon><v-icon>close</v-icon></v-btn>
          </td>
          <td>
            <select>
              <option v-for="idx in props.item.indices" :key="idx">{{idx}}</option>
            </select>
          </td>
          <td>{{ props.item.state }}</td>
        </tr>
      </template>
    </v-data-table>
    <!-- change z-index for v-data-table loading bar -->
    <Dimmer :loading="loading" text="Loading ..." style="z-index: 1" />
  </div>
</template>

<script lang="ts">
import elastic from '@/elastic'
import { Snapshot as SnapshotAll } from '@/elasticType/snapshotAll'
import parseHash from '@/util/parseHash'
import { Component, Vue } from 'vue-property-decorator'

interface TypeSnapshotRepo {
  name: string
}

interface TypeSnapshotItem extends SnapshotAll {
  deleting: boolean
}

@Component({
  components: {
    DebounceTextField: () => import(/* webpackChunkName: 'DebounceTextField' */ './DebounceTextField.vue'),
    Dimmer: () => import(/* webpackChunkName: 'Dimmer' */ './Dimmer.vue'),
  },
})
export default class Snapshot extends Vue {
  private loadingSnapshot: boolean = false
  private loadingSnapshotAll: boolean = false
  private snapshotHeaders = [
    { text: 'Snapshot', value: 'snapshot' },
    { text: 'Indices', value: 'indices' },
    { text: 'State', value: 'state' },
  ]
  private repos: TypeSnapshotRepo[] = []
  private snapshots: TypeSnapshotItem[] = []
  private selectRepoName: string = ''
  private search: string = ''

  get repoItemsForSelect() {
    return this.repos.map((repo) => repo.name)
  }

  get loading() {
    return this.loadingSnapshot || this.loadingSnapshotAll
  }

  public reloadSnapshot() {
    this.loadingSnapshot = true
    return elastic.snapshot()
      .then((snapshotResult) => {
        this.repos = []
        for (const [name, repoObj] of Object.entries(snapshotResult.data)) {
          const repo = {} as TypeSnapshotRepo
          repo.name = name
          this.repos.push(repo)
        }
        if (this.repos.length) {
          this.selectRepoName = this.selectRepoName || this.repos[0].name
        }
        if (this.selectRepoName) {
          this.reloadSnapshotAll(this.selectRepoName)
        }
      })
      .then(() => {
        this.loadingSnapshot = false
      })
  }

  private reloadSnapshotAll(name: string) {
    this.loadingSnapshotAll = true
    return elastic.snapshotAll(name)
      .then((result) => {
        this.snapshots = result.data.snapshots.map((item) => {
          return {
            deleting: false,
            ...item,
          }
        })
      })
      .then(() => {
        this.loadingSnapshotAll = false
      })
  }

  private deleteSnapshot(name: string, item: TypeSnapshotItem) {
    item.deleting = true
    return elastic.deleteSnapshot(name, item.snapshot)
      .then(() => {
        this.snapshots = this.snapshots.filter((val) => val.snapshot !== item.snapshot)
      })
  }

  private mounted() {
    if (parseHash().url) {
      this.reloadSnapshot()
    }
  }
}
</script>

<style lang="stylus" scoped>
.snapshot-root
  position relative

.deleting
  background-color #ccc
  pointer-events none
</style>
