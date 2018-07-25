export interface Shards {
  total: number
  failed: number
  successful: number
}

export interface Snapshot {
  snapshot: string
  uuid: string
  version_id: number
  version: string
  indices: string[]
  state: string
  start_time: Date
  start_time_in_millis: any
  end_time: Date
  end_time_in_millis: any
  duration_in_millis: number
  failures: any[]
  shards: Shards
}

export default interface RootObject {
  snapshots: Snapshot[]
}
