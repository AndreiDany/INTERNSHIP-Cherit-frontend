<script setup>
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <NavBar></NavBar>
    </div>
    <div class="row">
      <RouterView />
    </div>
    
  </div>
</template>

<style lang="scss">
@import "bootstrap";

$bootstrap-icons-font-src: url('bootstrap-icons/font/fonts/bootstrap-icons.woff2') format('woff2'),
  url('bootstrap-icons/font/fonts/bootstrap-icons.woff') format('woff');
@import 'bootstrap-icons/font/bootstrap-icons.scss';
</style>
