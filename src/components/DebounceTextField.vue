<template>
  <v-text-field
    v-model="modelValue"
    :label="label"
  />
</template>

<script lang="ts">
import Debounce from 'lodash.debounce'
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'

const defaultDebounce = 3000

function parseDebounce(debounce: number | string): number {
  if (debounce === 0 || debounce === '0') {
    return 0
  }
  return +debounce || defaultDebounce
}

@Component
export default class DebounceTextField extends Vue {
  @Model('change', { type: String, default: '' }) private value!: string
  @Prop({ type: [Number, String], default: defaultDebounce }) private debounce!: number | string
  @Prop(String) private label!: string
  private modelValue = ''
  private debounceSet = Debounce(() => this.setDebounceValue(), parseDebounce(this.debounce))

  @Watch('debounce')
  private onDebounceChange(val: number | string, old: number | string) {
    const debounce = parseDebounce(val)
    this.debounceSet.cancel()
    this.debounceSet = Debounce(() => this.setDebounceValue(), debounce)
    if (this.value !== this.modelValue) {
      this.debounceSet()
    }
  }

  @Watch('value')
  private onValueChange(val: string, old: string) {
    if (this.modelValue !== val) {
      this.debounceSet.cancel()
      this.modelValue = val
    }
  }

  @Watch('modelValue')
  private onModelValueChange(val: string, old: string) {
    if (this.value !== this.modelValue) {
      this.debounceSet()
    }
  }

  private setDebounceValue() {
    this.$emit('change', this.modelValue)
  }
}
</script>

<style lang="stylus" scoped>
</style>
