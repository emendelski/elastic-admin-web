export interface Settings {
  compress: string
  location: string
}

export interface Snapshot {
  type: string
  settings: Settings
}

export default interface RootObject {
  [key: string]: Snapshot
}
