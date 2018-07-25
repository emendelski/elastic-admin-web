export interface Shards {
  total: number
  successful: number
  failed: number
}

export interface Docs {
  count: number
  deleted: number
}

export interface Store {
  size_in_bytes: number
  throttle_time_in_millis: number
}

export interface Indexing {
  index_total: number
  index_time_in_millis: number
  index_current: number
  index_failed: number
  delete_total: number
  delete_time_in_millis: number
  delete_current: number
  noop_update_total: number
  is_throttled: boolean
  throttle_time_in_millis: number
}

export interface Get {
  total: number
  time_in_millis: number
  exists_total: number
  exists_time_in_millis: number
  missing_total: number
  missing_time_in_millis: number
  current: number
}

export interface Search {
  open_contexts: number
  query_total: number
  query_time_in_millis: number
  query_current: number
  fetch_total: number
  fetch_time_in_millis: number
  fetch_current: number
  scroll_total: number
  scroll_time_in_millis: number
  scroll_current: number
  suggest_total: number
  suggest_time_in_millis: number
  suggest_current: number
}

export interface Merges {
  current: number
  current_docs: number
  current_size_in_bytes: number
  total: number
  total_time_in_millis: number
  total_docs: number
  total_size_in_bytes: number
  total_stopped_time_in_millis: number
  total_throttled_time_in_millis: number
  total_auto_throttle_in_bytes: number
}

export interface Refresh {
  total: number
  total_time_in_millis: number
  listeners: number
}

export interface Flush {
  total: number
  total_time_in_millis: number
}

export interface Warmer {
  current: number
  total: number
  total_time_in_millis: number
}

export interface QueryCache {
  memory_size_in_bytes: number
  total_count: number
  hit_count: number
  miss_count: number
  cache_size: number
  cache_count: number
  evictions: number
}

export interface Fielddata {
  memory_size_in_bytes: number
  evictions: number
}

export interface Completion {
  size_in_bytes: number
}

export interface FileSizes {
}

export interface Segments {
  count: number
  memory_in_bytes: number
  terms_memory_in_bytes: number
  stored_fields_memory_in_bytes: number
  term_vectors_memory_in_bytes: number
  norms_memory_in_bytes: number
  points_memory_in_bytes: number
  doc_values_memory_in_bytes: number
  index_writer_memory_in_bytes: number
  version_map_memory_in_bytes: number
  fixed_bit_set_memory_in_bytes: number
  max_unsafe_auto_id_timestamp: number
  file_sizes: FileSizes
}

export interface Translog {
  operations: number
  size_in_bytes: number
}

export interface RequestCache {
  memory_size_in_bytes: number
  evictions: number
  hit_count: number
  miss_count: number
}

export interface Recovery {
  current_as_source: number
  current_as_target: number
  throttle_time_in_millis: number
}

export interface Primaries {
  docs: Docs
  store: Store
  indexing: Indexing
  get: Get
  search: Search
  merges: Merges
  refresh: Refresh
  flush: Flush
  warmer: Warmer
  query_cache: QueryCache
  fielddata: Fielddata
  completion: Completion
  segments: Segments
  translog: Translog
  request_cache: RequestCache
  recovery: Recovery
}

export interface Docs2 {
  count: number
  deleted: number
}

export interface Store2 {
  size_in_bytes: number
  throttle_time_in_millis: number
}

export interface Indexing2 {
  index_total: number
  index_time_in_millis: number
  index_current: number
  index_failed: number
  delete_total: number
  delete_time_in_millis: number
  delete_current: number
  noop_update_total: number
  is_throttled: boolean
  throttle_time_in_millis: number
}

export interface Get2 {
  total: number
  time_in_millis: number
  exists_total: number
  exists_time_in_millis: number
  missing_total: number
  missing_time_in_millis: number
  current: number
}

export interface Search2 {
  open_contexts: number
  query_total: number
  query_time_in_millis: number
  query_current: number
  fetch_total: number
  fetch_time_in_millis: number
  fetch_current: number
  scroll_total: number
  scroll_time_in_millis: number
  scroll_current: number
  suggest_total: number
  suggest_time_in_millis: number
  suggest_current: number
}

export interface Merges2 {
  current: number
  current_docs: number
  current_size_in_bytes: number
  total: number
  total_time_in_millis: number
  total_docs: number
  total_size_in_bytes: number
  total_stopped_time_in_millis: number
  total_throttled_time_in_millis: number
  total_auto_throttle_in_bytes: number
}

export interface Refresh2 {
  total: number
  total_time_in_millis: number
  listeners: number
}

export interface Flush2 {
  total: number
  total_time_in_millis: number
}

export interface Warmer2 {
  current: number
  total: number
  total_time_in_millis: number
}

export interface QueryCache2 {
  memory_size_in_bytes: number
  total_count: number
  hit_count: number
  miss_count: number
  cache_size: number
  cache_count: number
  evictions: number
}

export interface Fielddata2 {
  memory_size_in_bytes: number
  evictions: number
}

export interface Completion2 {
  size_in_bytes: number
}

export interface FileSizes2 {
}

export interface Segments2 {
  count: number
  memory_in_bytes: number
  terms_memory_in_bytes: number
  stored_fields_memory_in_bytes: number
  term_vectors_memory_in_bytes: number
  norms_memory_in_bytes: number
  points_memory_in_bytes: number
  doc_values_memory_in_bytes: number
  index_writer_memory_in_bytes: number
  version_map_memory_in_bytes: number
  fixed_bit_set_memory_in_bytes: number
  max_unsafe_auto_id_timestamp: number
  file_sizes: FileSizes2
}

export interface Translog2 {
  operations: number
  size_in_bytes: number
}

export interface RequestCache2 {
  memory_size_in_bytes: number
  evictions: number
  hit_count: number
  miss_count: number
}

export interface Recovery2 {
  current_as_source: number
  current_as_target: number
  throttle_time_in_millis: number
}

export interface Total {
  docs: Docs2
  store: Store2
  indexing: Indexing2
  get: Get2
  search: Search2
  merges: Merges2
  refresh: Refresh2
  flush: Flush2
  warmer: Warmer2
  query_cache: QueryCache2
  fielddata: Fielddata2
  completion: Completion2
  segments: Segments2
  translog: Translog2
  request_cache: RequestCache2
  recovery: Recovery2
}

export interface All {
  primaries: Primaries
  total: Total
}

export interface Docs3 {
  count: number
  deleted: number
}

export interface Store3 {
  size_in_bytes: number
  throttle_time_in_millis: number
}

export interface Indexing3 {
  index_total: number
  index_time_in_millis: number
  index_current: number
  index_failed: number
  delete_total: number
  delete_time_in_millis: number
  delete_current: number
  noop_update_total: number
  is_throttled: boolean
  throttle_time_in_millis: number
}

export interface Get3 {
  total: number
  time_in_millis: number
  exists_total: number
  exists_time_in_millis: number
  missing_total: number
  missing_time_in_millis: number
  current: number
}

export interface Search3 {
  open_contexts: number
  query_total: number
  query_time_in_millis: number
  query_current: number
  fetch_total: number
  fetch_time_in_millis: number
  fetch_current: number
  scroll_total: number
  scroll_time_in_millis: number
  scroll_current: number
  suggest_total: number
  suggest_time_in_millis: number
  suggest_current: number
}

export interface Merges3 {
  current: number
  current_docs: number
  current_size_in_bytes: number
  total: number
  total_time_in_millis: number
  total_docs: number
  total_size_in_bytes: number
  total_stopped_time_in_millis: number
  total_throttled_time_in_millis: number
  total_auto_throttle_in_bytes: number
}

export interface Refresh3 {
  total: number
  total_time_in_millis: number
  listeners: number
}

export interface Flush3 {
  total: number
  total_time_in_millis: number
}

export interface Warmer3 {
  current: number
  total: number
  total_time_in_millis: number
}

export interface QueryCache3 {
  memory_size_in_bytes: number
  total_count: number
  hit_count: number
  miss_count: number
  cache_size: number
  cache_count: number
  evictions: number
}

export interface Fielddata3 {
  memory_size_in_bytes: number
  evictions: number
}

export interface Completion3 {
  size_in_bytes: number
}

export interface FileSizes3 {
}

export interface Segments3 {
  count: number
  memory_in_bytes: number
  terms_memory_in_bytes: number
  stored_fields_memory_in_bytes: number
  term_vectors_memory_in_bytes: number
  norms_memory_in_bytes: number
  points_memory_in_bytes: number
  doc_values_memory_in_bytes: number
  index_writer_memory_in_bytes: number
  version_map_memory_in_bytes: number
  fixed_bit_set_memory_in_bytes: number
  max_unsafe_auto_id_timestamp: number
  file_sizes: FileSizes3
}

export interface Translog3 {
  operations: number
  size_in_bytes: number
}

export interface RequestCache3 {
  memory_size_in_bytes: number
  evictions: number
  hit_count: number
  miss_count: number
}

export interface Recovery3 {
  current_as_source: number
  current_as_target: number
  throttle_time_in_millis: number
}

export interface Primaries2 {
  docs: Docs3
  store: Store3
  indexing: Indexing3
  get: Get3
  search: Search3
  merges: Merges3
  refresh: Refresh3
  flush: Flush3
  warmer: Warmer3
  query_cache: QueryCache3
  fielddata: Fielddata3
  completion: Completion3
  segments: Segments3
  translog: Translog3
  request_cache: RequestCache3
  recovery: Recovery3
}

export interface Docs4 {
  count: number
  deleted: number
}

export interface Store4 {
  size_in_bytes: number
  throttle_time_in_millis: number
}

export interface Indexing4 {
  index_total: number
  index_time_in_millis: number
  index_current: number
  index_failed: number
  delete_total: number
  delete_time_in_millis: number
  delete_current: number
  noop_update_total: number
  is_throttled: boolean
  throttle_time_in_millis: number
}

export interface Get4 {
  total: number
  time_in_millis: number
  exists_total: number
  exists_time_in_millis: number
  missing_total: number
  missing_time_in_millis: number
  current: number
}

export interface Search4 {
  open_contexts: number
  query_total: number
  query_time_in_millis: number
  query_current: number
  fetch_total: number
  fetch_time_in_millis: number
  fetch_current: number
  scroll_total: number
  scroll_time_in_millis: number
  scroll_current: number
  suggest_total: number
  suggest_time_in_millis: number
  suggest_current: number
}

export interface Merges4 {
  current: number
  current_docs: number
  current_size_in_bytes: number
  total: number
  total_time_in_millis: number
  total_docs: number
  total_size_in_bytes: number
  total_stopped_time_in_millis: number
  total_throttled_time_in_millis: number
  total_auto_throttle_in_bytes: number
}

export interface Refresh4 {
  total: number
  total_time_in_millis: number
  listeners: number
}

export interface Flush4 {
  total: number
  total_time_in_millis: number
}

export interface Warmer4 {
  current: number
  total: number
  total_time_in_millis: number
}

export interface QueryCache4 {
  memory_size_in_bytes: number
  total_count: number
  hit_count: number
  miss_count: number
  cache_size: number
  cache_count: number
  evictions: number
}

export interface Fielddata4 {
  memory_size_in_bytes: number
  evictions: number
}

export interface Completion4 {
  size_in_bytes: number
}

export interface FileSizes4 {
}

export interface Segments4 {
  count: number
  memory_in_bytes: number
  terms_memory_in_bytes: number
  stored_fields_memory_in_bytes: number
  term_vectors_memory_in_bytes: number
  norms_memory_in_bytes: number
  points_memory_in_bytes: number
  doc_values_memory_in_bytes: number
  index_writer_memory_in_bytes: number
  version_map_memory_in_bytes: number
  fixed_bit_set_memory_in_bytes: number
  max_unsafe_auto_id_timestamp: number
  file_sizes: FileSizes4
}

export interface Translog4 {
  operations: number
  size_in_bytes: number
}

export interface RequestCache4 {
  memory_size_in_bytes: number
  evictions: number
  hit_count: number
  miss_count: number
}

export interface Recovery4 {
  current_as_source: number
  current_as_target: number
  throttle_time_in_millis: number
}

export interface Total2 {
  docs: Docs4
  store: Store4
  indexing: Indexing4
  get: Get4
  search: Search4
  merges: Merges4
  refresh: Refresh4
  flush: Flush4
  warmer: Warmer4
  query_cache: QueryCache4
  fielddata: Fielddata4
  completion: Completion4
  segments: Segments4
  translog: Translog4
  request_cache: RequestCache4
  recovery: Recovery4
}

export interface Index {
  primaries: Primaries2
  total: Total2
}

export interface Indices {
  [key: string]: Index
}

export default interface RootObject {
  _shards: Shards
  _all: All
  indices: Indices
}
