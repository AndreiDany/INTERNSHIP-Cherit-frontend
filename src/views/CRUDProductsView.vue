<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/clientStore.js";
import { useProductsStore } from "../stores/productsStore.js";

const clientStore = useClientStore();

const productsStore = useProductsStore();
const allCategory = ref([]);

const productId = ref(0);
const productName = ref("");

const newProductName = ref("");
const newProductPrice = ref();
const newProductDescription = ref("");
const newProductCategory = ref();
const newProductImage = ref("");

const message = ref("");

onMounted(() => {
  axios
    .get("http://cherit3.test/products", {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      productsStore.products = response.data.slice();
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });

  axios
    .get(
      "http://cherit3.test/category",
      {},
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(response => {
      allCategory.value = response.data.slice();
    });
});

function addProduct() {
  axios
    .post(
      "http://cherit3.test/product",
      {
        name: newProductName.value,
        price: newProductPrice.value,
        description: newProductDescription.value,
        category_id: newProductCategory.value,
        image: newProductImage.value,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      productsStore.products.push({
        id: response.data.id,
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        category_id: response.data.category_id,
        image: response.data.image,
      });
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });

  newProductName.value = "";
  newProductPrice.value = null;
  newProductDescription.value = "";
  newProductCategory.value = null;
  newProductImage.value = "";
}

function editProduct() {
  console.log(newProductCategory.value);
  axios
    .post(
      "http://cherit3.test/product/" + productId.value,
      {
        name: newProductName.value,
        price: newProductPrice.value,
        description: newProductDescription.value,
        category_id: newProductCategory.value,
        image: newProductImage.value,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      const productIndex = productsStore.products.findIndex(
        product => product.id == productId.value
      );
      if (productIndex !== -1) {
        //console.log( productsStore.products[productIndex]);
        productsStore.products[productIndex].name = newProductName.value;
        productsStore.products[productIndex].price = newProductPrice.value;
        productsStore.products[productIndex].description =
          newProductDescription.value;
        productsStore.products[productIndex].category_id =
          newProductCategory.value;
        productsStore.products[productIndex].image = newProductImage.value;
      }
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
}

function deleteProduct() {
  axios
    .delete("http://cherit3.test/product/" + productId.value, {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      productsStore.products.splice(
        productsStore.products.findIndex(item => item.id == productId.value),
        1
      );
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
}
</script>
<template>
  <section class="col contact mt-2">
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>CRUD <b>Products</b></h2>
            </div>
            <div class="col-sm-6">
              <button
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#addProduct"
                @click="
                  (newProductName = ''),
                    (newProductPrice = null),
                    (newProductDescription = ''),
                    (newProductCategory = 1),
                    (newProductImage = '')
                "
              >
                <i class="bi bi-plus-circle-fill"></i>
                <span>Add New Product</span>
              </button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productsStore.products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td style="width: 16rem">{{ product.description }}</td>
              <td>{{ product.category_id }}</td>
              <td>{{ product.image }}</td>
              <td>
                <button
                  class="btn btn-outline-dark me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editProduct"
                  @click="
                    (productId = product.id),
                      (productName = product.name),
                      (newProductName = product.name),
                      (newProductPrice = product.price),
                      (newProductDescription = product.description),
                      (newProductCategory = product.category_id),
                      (newProductImage = product.image)
                  "
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteProduct"
                  @click="
                    (productId = product.id), (productName = product.name)
                  "
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Add Product -->
    <div
      class="modal fade"
      id="addProduct"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Add a product
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5>Name</h5>
            <input
              v-model="newProductName"
              type="text"
              class="input-group-text"
              placeholder="Product name"
            />
            <br />
            <h5>Price</h5>
            <input
              v-model="newProductPrice"
              type="text"
              class="input-group-text"
              placeholder="Product price"
            />
            <br />
            <h5>Description</h5>
            <input
              v-model="newProductDescription"
              type="text"
              class="input-group-text"
              placeholder="Product description"
            />
            <br />

            <h5>Category</h5>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="newProductCategory"
              style="width: 13rem"
            >
              <option
                v-for="category in allCategory"
                :key="category.id"
                :value="category.id"
              >
                {{ category.id }} {{ category.name }}
              </option>
            </select>
            <br />

            <h5>Image</h5>
            <input
              v-model="newProductImage"
              type="text"
              class="input-group-text"
              placeholder="Product image"
            />
            <br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="addProduct()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Product -->
    <div
      class="modal fade"
      id="editProduct"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ productName }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5>Name</h5>
            <input
              v-model="newProductName"
              type="text"
              class="input-group-text"
              placeholder="Product name"
            />
            <br />
            <h5>Price</h5>
            <input
              v-model="newProductPrice"
              type="text"
              class="input-group-text"
              placeholder="Product price"
            />
            <br />
            <h5>Description</h5>
            <input
              v-model="newProductDescription"
              type="text"
              class="input-group-text"
              placeholder="Product description"
            />
            <br />

            <h5>Category</h5>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="newProductCategory"
              style="width: 13rem"
            >
              <option
                v-for="category in allCategory"
                :key="category.id"
                :value="category.id"
              >
                {{ category.id }} {{ category.name }}
              </option>
            </select>

            <br />
            <h5>Image</h5>
            <input
              v-model="newProductImage"
              type="text"
              class="input-group-text"
              placeholder="Product image"
            />
            <br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="editProduct()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Delete Category -->
    <div
      class="modal fade"
      id="deleteProduct"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Esti sigur ca vrei sa stergi produsul "{{ productName }}"
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteProduct()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
body {
  color: #566787;
  background: #f5f5f5;
  font-size: 13px;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  margin: 30px 0;
  border-radius: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #125993;
  color: #fff;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn-group {
  float: right;
}
.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 6px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td i {
  font-size: 19px;
}
</style>
