<script setup>
import OneCategory from "../components/menu/OneCategory.vue";

import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const allCategory = ref([]);
const categoryId = ref(1);
const categoryName = ref("pizza");

onMounted(() => {
  axios({
    method: "get",
    url: "http://cherit.test/category",
  }).then(response => {
    allCategory.value = response.data.slice();
  });
});

function ChangeCategory(id, name) {
  categoryId.value = id;
  categoryName.value = name;
}
</script>

<template>
  <!-- ======= Menu Section ======= -->
  <section id="menu" class="col menu">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <h2 class="mt-2">Our Menu</h2>
        <p>Check Our <span>Yummy Menu</span></p>
      </div>

      <ul
        class="nav nav-tabs d-flex justify-content-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <li
          v-for="category in allCategory"
          :key="category.id"
          :name="category.name"
          class="nav-item"
          @click="ChangeCategory(category.id, category.name)"
        >
          <a
            class="nav-link active show"
            data-bs-toggle="tab"
            data-bs-target="#menu-starters"
          >
            <h4>{{ category.name }}</h4>
          </a>
        </li>
      </ul>

      <OneCategory
        :id="categoryId"
        :name="categoryName"
        class="tab-content"
        data-aos="fade-up"
        data-aos-delay="300"
      />
      <!-- End Menu Content from one category -->
    </div>
  </section>
  <!-- End Menu Section -->
</template>
