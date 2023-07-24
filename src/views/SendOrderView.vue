<script setup>
import { ref } from "vue";
import axios from "axios";
import { useShoppingCartStore } from "../stores/shoppingCart";
import { useClientStore } from "../stores/clientStore.js";

const shoppingCartStore = useShoppingCartStore();
const clientStore = useClientStore();

const address = ref("");
const message = ref("");

async function sendOrder() {
  await axios
    .post(
      "http://cherit3.test/send-order",
      {
        address: address.value,
        price: shoppingCartStore.total,
        products: shoppingCartStore.shoppingCart,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      console.log(response);
      message.value = "Comanda a fost plasata cu succes!";
      shoppingCartStore.setShoppingCart([]);
      shoppingCartStore.setTotal(0);
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Am întâmpinat probleme în trimiterea comenzii!";
    });
}
</script>
<template>
  <section id="contact" class="col contact">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p class="mt-2">Send order</p>
      </div>

      <div class="php-email-form p-3 p-md-4">
        <div class="row">
          <div class="col form-group">
            <input
              type="text"
              class="form-control"
              name="address"
              id="adress"
              v-model="address"
              placeholder="Your Address:"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col d-flex justify-content-center mt-2">
            <h5>Payment method</h5>
          </div>
        </div>

        <div class="row">
          <div
            class="col d-flex justify-content-center align-items-center flex-column"
          >
            <div class="form-check">
              <div class="d-flex align-items-center">
                <input
                  id="flexRadioDefault1"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  &nbsp;&nbsp;Cash
                </label>
              </div>
            </div>
            <div class="form-check">
              <div class="d-flex align-items-center">
                <input
                  id="flexRadioDefault2"
                  type="radio"
                  name="flexRadioDefault"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  &nbsp;&nbsp;Card
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div class="text-center">
          <button
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#sendOrderModal"
            @click="sendOrder()"
          >
            Send order
          </button>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="sendOrderModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  {{ message }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!-- <div class="modal-body">Email sau parola incorecta</div> -->
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
    </div>
  </section>
</template>
