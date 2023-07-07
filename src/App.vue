<script setup>
//Template Main JS File
import './assets/js/main.js'

import '../node_modules/bootstrap/dist/js/bootstrap.js'

import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/TheFooter.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <NavBar></NavBar>
    </div>
    <div class="row">
      <RouterView />
    </div>
    <div class="row">
      <div class="col">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<style setup>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';

/*Template Main CSS File*/
@import './assets/css/main.css';

/* Vendor CSS Files
@import "./assets/vendor/aos/aos.css";
@import "./assets/vendor/glightbox/css/glightbox.min.css";
@import "./assets/vendor/swiper/swiper-bundle.min.css";
 */
</style>
