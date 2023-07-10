<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const props = defineProps(['id', 'quantity'])

const product = ref([])

onMounted(() => {
  axios({
    method: 'get',
    url: 'http://cherit.test/product/' + props.id
  }).then((response) => {
    product.value = response.data.slice();
  })
})

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
</script>

<template>
  <div class="menu-item border-bottom mb-4">
    <img
      :src="getImageUrl(product[0]?.image)"
      class="img-fluid rounded border border-grey border-3"
      style="width: 12rem"
      alt="Menu image"
    />
    <h4>{{ product[0]?.name }}</h4>
    <p class="ingredients">Lorem, deren, trataro, filede, nerada</p>
    <p class="price fw-bold">${{ product[0]?.price }}</p>
  </div>
  <!-- Shopping cart Item -->
</template>
