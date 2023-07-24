<script setup>
import { useShoppingCartStore } from "../../stores/shoppingCart";
//import axios from 'axios';

const shoppingCartStore = useShoppingCartStore();

const props = defineProps(["id", "name", "price", "description", "image"]);

// extragerea imaginii din laravel
function getImageUrl(image) {
  const baseUrl = "http://cherit3.test/img/";

  return `${baseUrl}${image}`;
}

//adaugarea unui produs in cos
function addProduct() {
  shoppingCartStore.updateShoppingCart({
    id: props.id,
    quantity: 1,
  });
  shoppingCartStore.addToTotal(props.price);
}

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
    <a href="#" class="glightbox"
      ><img
        :src="getImageUrl(image)"
        class="img-fluid rounded border border-grey border-3"
        style="width: 18rem"
        alt="Menu image"
    /></a>
    <h4>{{ name }}</h4>
    <p class="ingredients">Lorem, deren, trataro, filede, nerada</p>
    <p class="price">${{ price }}</p>
    <button class="btn btn-danger" @click="addProduct()">Add to cart</button>
  </div>
  <!-- Menu Item -->
</template>
