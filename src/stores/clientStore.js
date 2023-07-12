import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useClientStore = defineStore('clientStore', {
  state: () => {
    return {
      clientId: parseInt(Cookies.get('clientId') || 0)
    }
  },
  actions: {
    setClient(id) {
      //setarea unui anumit client
      this.clientId = Number(id)

      Cookies.set('clientId', this.clientId.toString())
    }
  }
})
