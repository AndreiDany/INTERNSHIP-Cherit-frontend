<script setup>
import { RouterLink } from "vue-router";
import CartProduct from "./CartProduct.vue";
import { useShoppingCartStore } from "../../stores/shoppingCart";
import { useClientStore } from "../../stores/clientStore";

const shoppingCartStore = useShoppingCartStore();
const clientStore = useClientStore();
</script>

<template>
  <div
    class="offcanvas offcanvas-end"
    data-bs-scroll="true"
    tabindex="-1"
    id="ShoppingCart"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header m-3">
      <h5 class="offcanvas-title fw-bold" id="offcanvasWithBothOptionsLabel">
        Shopping cart
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <h5 class="fw-bold mb-3">Total: ${{ shoppingCartStore.total }}</h5>
      </div>
      <div class="mb-3">
        <RouterLink
          v-if="clientStore.clientToken != ''"
          class="btn btn-outline-dark"
          to="/sendOrder"
          >Send order</RouterLink
        >
        <RouterLink
          v-if="clientStore.clientToken == ''"
          class="btn btn-outline-dark"
          to="/login"
          >Login</RouterLink
        >
      </div>
      <div class="gy-4">
        <CartProduct
          v-for="product in shoppingCartStore.shoppingCart"
          :key="product.id"
          :id="product.id"
          :quantity="product.quantity"
        />
      </div>
      <div>
        <RouterLink
          v-if="clientStore.clientToken != ''"
          class="btn btn-outline-dark"
          to="/sendOrder"
          >Send order</RouterLink
        >
        <RouterLink
          v-if="clientStore.clientToken == ''"
          class="btn btn-outline-dark"
          to="/login"
          >Login</RouterLink
        >
      </div>
    </div>
  </div>
</template>
