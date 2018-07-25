import ResponseSnapshot from '@/elasticType/snapshot'
import ResponseSnapshotAll from '@/elasticType/snapshotAll'
import ResponseStats from '@/elasticType/stats'
import axios, { AxiosError, AxiosPromise } from 'axios'

const defaultURL = 'http://localhost:9200'

interface ResponseClusterStats {
  metadata: ResponseClusterStatsMetadata
}

interface ResponseClusterStatsMetadata {
  indices: ResponseClusterStatsMetadataIndices
}

interface ResponseClusterStatsMetadataIndices {
  [x: string]: ResponseClusterStatsMetadataIndicesValue
}

interface ResponseClusterStatsMetadataIndicesValue {
  settings: ResponseClusterStatsMetadataIndicesValueSettings
}

interface ResponseClusterStatsMetadataIndicesValueSettings {
  index: ResponseClusterStatsMetadataIndicesValueSettingsIndex
}

interface ResponseClusterStatsMetadataIndicesValueSettingsIndex {
  number_of_replicas: number
  number_of_shards: number
}

interface SingletonPromise {
  [key: string]: Promise<any>
}

type ErrorHandler = (err: AxiosError) => any

export default new class Elastic {

  private baseURL: string = defaultURL
  private errorHandler: ErrorHandler
  private singletonPromise: SingletonPromise = {}

  constructor() {
    this.baseURL = defaultURL
    // tslint:disable-next-line:no-console
    this.errorHandler = (err: AxiosError) => { console.log(err) }
  }

  get url(): string {
    return this.baseURL || defaultURL
  }
  set url(str: string) {
    this.baseURL = str.replace(/\/+$/, '')
  }

  public setErrorHandler(handler: ErrorHandler) {
    this.errorHandler = handler
  }

  public stats() {
    return this.get<ResponseStats>('/_stats')
  }

  public clusterState() {
    return this.get<ResponseClusterStats>('/_cluster/state')
  }

  public deleteIndex(index: string) {
    return this.singleton('deleteIndex', () => this.delete(`/${index}`))
  }

  public setIndexNumberOfReplicas(index: string, num: number) {
    return this.putIndexSettings(index, {
      index: {
        number_of_replicas: num,
      },
    })
  }

  public snapshot() {
    return this.get<ResponseSnapshot>('/_snapshot')
  }

  public snapshotAll(indices: string) {
    return this.get<ResponseSnapshotAll>(`/_snapshot/${indices}/_all`)
  }

  public deleteSnapshot(repo: string, snapshot: string) {
    return this.singleton('deleteSnapshot', () => this.delete(`/_snapshot/${repo}/${snapshot}`))
  }

  private get<T>(path: string): AxiosPromise<T> {
    const url = this.baseURL + path
    return axios.get<T>(url)
      .catch(this.errorHandler)
  }

  private delete(path: string) {
    const url = this.baseURL + path
    return axios.delete(url)
      .catch(this.errorHandler)
  }

  private putIndexSettings(index: string, data: object) {
    const url = this.baseURL + '/' + index + '/_settings'
    return axios.put(url, data)
  }

  private singleton<T>(name: string, next: () => Promise<T>) {
    this.singletonPromise[name] = (this.singletonPromise[name] || Promise.resolve()).then(next)
    return this.singletonPromise[name]
  }
}()
