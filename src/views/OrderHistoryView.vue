<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/clientStore.js";

const clientStore = useClientStore();

const allOrders = ref([]);
const products = ref([]);

onMounted(() => {
  axios({
    method: "get",
    url: "http://cherit3.test/orders",
    headers: {
      Authorization: "Bearer " + clientStore.clientToken,
      Accept: "application/json",
    },
  }).then(response => {
    allOrders.value = response.data.slice();
  });
});

async function showProducts(orderId) {
  await axios
    .get("http://cherit3.test/order/" + orderId, {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      products.value = response.data.slice();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// extragerea imaginii din laravel
function getImageUrl(image) {
  const baseUrl = "http://cherit3.test/img/";

  return `${baseUrl}${image}`;
}
</script>
<template>
  <section id="contact" class="col contact">
    <div class="container">
      <div class="section-header">
        <p class="mt-2">Order History</p>
      </div>

      <div
        v-for="order in allOrders"
        :key="order.id"
        class="row gy-4 mb-2"
        data-bs-toggle="modal"
        data-bs-target="#ordersModal"
        @click="showProducts(order.id)"
      >
        <div class="col-12">
          <div class="info-item d-flex align-items-center">
            <i class="icon bi bi-bag-check-fill flex-shrink-0"></i>
            <div>
              <h3>Id comada: {{ order.id }}, adresa: {{ order.address }}</h3>
              <p class="text-secondary fw-bold">Pret: {{ order.price }} lei</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="ordersModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Produse:</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                v-for="product in products"
                :key="product.id"
                class="d-flex align-items-center flex-column border-bottom mb-3 me-4"
              >
                <div><strong>Nume:</strong> {{ product.productName }}</div>
                <img
                  :src="getImageUrl(product.productImage)"
                  class="img-fluid rounded border border-grey border-3"
                  style="width: 15rem"
                  alt="order product image"
                />
                <div><strong>preț:</strong> {{ product.productPrice }} lei</div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
