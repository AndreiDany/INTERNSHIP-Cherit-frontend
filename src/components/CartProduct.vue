<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useShoppingCartStore } from '../stores/shoppingCart.js'

const props = defineProps(['id', 'quantity'])

const shoppingCartStore = useShoppingCartStore()

const product = ref([])

onMounted(() => {
  axios({
    method: 'get',
    url: 'http://cherit.test/product/' + props.id
  }).then((response) => {
    product.value = response.data.slice()
  })
})

// extragerea imaginii din laravel
function getImageUrl(image) {
  const baseUrl = 'http://cherit.test/img/'

  return `${baseUrl}${image}`
}

// stergerea produsului din cosul de cumparaturi
function deleteProduct() {
  shoppingCartStore.removeProductById(props.id, product.value[0].price)
}
</script>

<template>
  <div class="menu-item border-bottom mb-4">
    <img
      v-if="product[0]?.image"
      :src="getImageUrl(product[0].image)"
      class="img-fluid rounded border border-grey border-3"
      style="width: 12rem"
      alt="Menu image"
    />
    <h4>
      {{ product[0]?.name }}
      <button class="btn btn-outline-dark" @click="deleteProduct()"><i class="bi bi-trash"></i></button>
    </h4>
    <p class="ingredients">Lorem, deren, trataro, filede, nerada</p>
    <p class="price fw-bold">${{ product[0]?.price }}</p>
  </div>
  <!-- Shopping cart Item -->
</template>
