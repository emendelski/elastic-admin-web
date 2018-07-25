<template>
  <div class="dimmer-root" :class="{ 'active': loading }">
    <div class="dimmer" />
    <div v-if="text" class="text-container">
      <div class="text-block px-4 py-2 white">
        <div>{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Dimmer extends Vue {
  @Prop() private loading!: boolean
  @Prop() private text!: string
}
</script>

<style lang="stylus" scoped>
.dimmer-root,
.dimmer,
.text-container
  position absolute
  top 0
  left 0
  width 100%
  height 100%

.dimmer-root
  display none

  &.active
    display block

.dimmer
  background-color #ccc
  opacity 0.5

.text-container
  display flex
  align-items center
  justify-content center
</style>
