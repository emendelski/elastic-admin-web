import { StoreOptions } from 'vuex'

class State {
  public msgs: Message[] = []
}

export interface Message {
  text: string
}

interface AlertPayload {
  text: string
}

export default {
  getters: {
    alertMsgs(state: State) {
      return state.msgs
    },
  },
  mutations: {
    Alert(state: State, payload: AlertPayload) {
      if (!payload.text) {
        return
      }
      state.msgs.push({
        text: payload.text,
      })
    },
    AlertRemoveHead(state: State) {
      state.msgs = state.msgs.slice(1)
    },
  },
  state: new State(),
} as StoreOptions<State>
