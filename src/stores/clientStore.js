import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useClientStore = defineStore('clientStore', {
  state: () => {
    return {
      clientId: parseInt(Cookies.get('clientId') || 0),
      clientName: Cookies.get('clientName') || ""
    }
  },
  actions: {
    setClient(id) {
      //setarea unui anumit client
      this.clientId = Number(id)

      Cookies.set('clientId', this.clientId.toString())
    },
    setClientName(name) {
      //setarea numelui clientului
      this.clientName = String(name)

      Cookies.set('clientName', this.clientName.toString())
    },
  }
})
