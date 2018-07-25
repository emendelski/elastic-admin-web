declare module 'vue-shortkey' {
  import Vue, { VueConstructor } from 'vue'

  interface Options {
    prevent?: string[]
  }

  export function install(vue?: VueConstructor<Vue>, opt?: Options): void
}
