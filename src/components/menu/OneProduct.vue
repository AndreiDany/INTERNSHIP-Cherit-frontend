<script setup>
//import axios from 'axios';

//const props = 
defineProps(['name', 'price', 'description']);

// async function deleteProduct() {
//   axios({
//     method: 'delete',
//     url: '...',
//     data: {
//       name: props.name
//     }
//   });
// }
</script>
<template>
  <div class="col-lg-4 menu-item">
    <a href="assets/img/menu/menu-item-1.png" class="glightbox"
      ><img src="src/assets/img/menu/menu-item-1.png" class="menu-img img-fluid" alt=""
    /></a>
    <h4>{{ name }}</h4>
    <p class="ingredients">Lorem, deren, trataro, filede, nerada</p>
    <p class="price">${{ price }}</p>
  </div>
  <!-- Menu Item -->
</template>
