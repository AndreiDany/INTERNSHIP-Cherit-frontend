<script setup>
import { RouterLink } from "vue-router";
import ShoppingCart from "./shoppingCart/ShoppingCart.vue";

import { useClientStore } from "../stores/clientStore.js";

const clientStore = useClientStore();
</script>

<template>
  <header id="header" class="col header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">
      <RouterLink to="/" class="logo d-flex align-items-center me-auto me-lg-0">
        <img src="/icons/icon-72x72.png" alt="" />
        <h1>Cherit</h1>
      </RouterLink>

      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/menu">Menu</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <li class="dropdown">
            <a href="#"
              ><span>Account</span><i class="bi bi-person fs-6 fst-normal"></i
            ></a>
            <ul>
              <li v-if="clientStore.clientToken == ''">
                <RouterLink to="/login">Login</RouterLink>
              </li>
              <li v-if="clientStore.clientToken == ''">
                <RouterLink to="/register">Register</RouterLink>
              </li>
              <li v-if="clientStore.clientToken != ''">
                <p class="ms-3 mt-2">
                  {{ clientStore.clientName }}
                </p>
              </li>
              <li v-if="clientStore.clientToken != ''">
                <RouterLink
                  @click="
                    clientStore.setToken(''), clientStore.setAdmin('false')
                  "
                  to="/"
                  >Logout</RouterLink
                >
              </li>
              <li v-if="clientStore.clientToken != ''">
                <RouterLink to="/orderHistory">Order History</RouterLink>
              </li>
              <li v-if="clientStore.isAdmin == 'true'">
                <RouterLink to="/crudCategories">CRUD Categories</RouterLink>
              </li>
              <li v-if="clientStore.isAdmin == 'true'">
                <RouterLink to="/crudProducts">CRUD Products</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- .navbar -->

      <!-- Button for modal shopping cart -->
      <button
        class="btn-book-a-table border-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#ShoppingCart"
        aria-controls="offcanvasWithBothOptions"
      >
        Shopping cart
      </button>

      <!-- shopping cart modal -->
      <ShoppingCart></ShoppingCart>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
  <!-- End Header -->
</template>
