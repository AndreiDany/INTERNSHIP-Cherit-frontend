<script setup>
import { useShoppingCartStore } from "../../stores/shoppingCart";

const shoppingCartStore = useShoppingCartStore();

//import axios from 'axios';

const props = defineProps(['id', 'name', 'price', 'description', 'image'])

// async function deleteProduct() {
//   axios({
//     method: 'delete',
//     url: '...',
//     data: {
//       name: props.name
//     }
//   });
// }

// extragerea imaginii din laravel
function getImageUrl(image) {
  const baseUrl = 'http://cherit.test/img/'

  return `${baseUrl}${image}`
}

//adaugarea unui produs in cos
function addProduct() {
  let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))

  cartProducts.push({
    id: props.id,
    quantity: 1
  })

  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  
  shoppingCartStore.shoppingCart = cartProducts;

  //console.log(shoppingCartStore.shoppingCart)

  let total = localStorage.getItem('total');

  total = Number(total) + Number(props.price);

  localStorage.setItem('total', total);

  shoppingCartStore.total = total;

}
</script>
<template>
  <div class="col-lg-4 menu-item">
    <a href="assets/img/menu/menu-item-1.png" class="glightbox"
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
