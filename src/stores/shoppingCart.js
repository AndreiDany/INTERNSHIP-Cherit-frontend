import { defineStore } from 'pinia'

localStorage.setItem('cartProducts', JSON.stringify([]))
localStorage.setItem('total', 0)

export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => {
    return {
      shoppingCart: JSON.parse(localStorage.getItem('cartProducts')),
      total: localStorage.getItem('total', 0)
    }
  }
})
