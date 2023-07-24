import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useShoppingCartStore = defineStore("shoppingCart", {
  state: () => {
    return {
      shoppingCart: JSON.parse(Cookies.get("cartProducts") || "[]"),
      total: parseInt(Cookies.get("total") || 0),
    };
  },
  actions: {
    setShoppingCart(cart) {
      this.shoppingCart = String(cart);

      Cookies.set("cartProducts", this.shoppingCart.toString());
    },
    setTotal(total) {
      this.total = Number(total);

      Cookies.set("total", this.total.toString());
    },
    updateShoppingCart(product) {
      // Adaugă produsul în coșul de cumpărături
      this.shoppingCart.push(product);

      // Actualizează cookie-urile cu noul coș de cumpărături și totalul
      Cookies.set("cartProducts", JSON.stringify(this.shoppingCart));
    },

    // Adunarea unei valori la total
    addToTotal(value) {
      this.total += Number(value);

      // Actualizează cookie-ul cu noul total
      Cookies.set("total", this.total.toString());
    },

    // Funcție pentru ștergerea unui produs în funcție de "id"
    removeProductById(id, value) {
      const index = this.shoppingCart.findIndex(product => product.id === id);

      if (index !== -1) {
        this.shoppingCart.splice(index, 1)[0];

        // Actualizează totalul prin scăderea valorii produsului eliminat
        this.total -= Number(value);

        // Actualizează cookie-urile cu noul coș de cumpărături și totalul
        Cookies.set("cartProducts", JSON.stringify(this.shoppingCart));
        Cookies.set("total", this.total.toString());
      }
    },
  },
});
