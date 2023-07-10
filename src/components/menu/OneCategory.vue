<script setup>
import OneProduct from './OneProduct.vue'

import { ref } from 'vue'

import { onMounted } from 'vue'
import { watch } from 'vue'
import axios from 'axios'

const props = defineProps(['id', 'name'])

const allProducts = ref([])

onMounted(() => {
  axios({
    method: 'get',
    url: 'http://cherit.test/products/' + props.id
  }).then((response) => {
    allProducts.value = response.data.slice()
  })
})

watch(
  () => props.id,
  () => {
    axios({
      method: 'get',
      url: 'http://cherit.test/products/' + props.id
    }).then((response) => {
      allProducts.value = response.data.slice()
    })
  }
)
</script>

<template>
  <div class="tab-pane fade active show" id="menu-starters">
    <div class="tab-header text-center">
      <h3>{{ name }}</h3>
    </div>

    <div class="row gy-5">
      <OneProduct
        v-for="product in allProducts"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :description="product.description"
        :image="product.image"
      />
    </div>
  </div>
</template>
