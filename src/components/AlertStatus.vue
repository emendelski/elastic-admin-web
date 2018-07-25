<template>
  <v-snackbar class="alert-status-root"
    v-model="show"
    :color="color"
    :timeout="timeout"
    :multi-line="text.length > 100"
    top>
    <div class="eaw-flex" style="width: 100%; align-items: center; justify-content: space-between;">
      <span>{{ text }}</span>
      <v-btn class="white--text ma-0 pa-0"
        @click.native="dismiss"
        flat icon>
        <v-icon>close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import elastic from '@/elastic'
import { Message } from '@/store/alert'
import { AxiosError } from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'

@Component
export default class AlertStatus extends Vue {
  @Getter private alertMsgs!: Message[]
  @Mutation private Alert: any
  @Mutation private AlertRemoveHead: any

  get msg(): Message {
    if (this.alertMsgs.length) {
      return this.alertMsgs[0]
    }
    return { text: '' }
  }

  get color(): string {
    return 'red darken-1'
  }

  get timeout(): number {
    return 0
  }

  get text(): string {
    return this.msg.text || ''
  }

  get show(): boolean {
    return !!this.alertMsgs.length
  }
  set show(value: boolean) {
    if (!value) {
      this.dismiss()
    }
  }

  private dismiss(): void {
    this.AlertRemoveHead()
  }

  private extractErrorMessage(err: AxiosError): string {
    if (err.response) {
      if (err.response.data) {
        if (err.response.data.error) {
          if (err.response.data.error.reason) {
            return err.response.data.error.reason
          }
        }
      }
      return JSON.stringify(err.response)
    }
    if (err.toString) {
      return err.toString()
    }
    if (err.message) {
      return err.message
    }
    return JSON.stringify(err)
  }

  private created() {
    elastic.setErrorHandler((err) => {
      const text = this.extractErrorMessage(err)
      this.Alert({ text })
      throw err
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
