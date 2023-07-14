<script setup>
import { ref } from "vue";
import axios from "axios";
import { useShoppingCartStore } from "../stores/shoppingCart";
import { useClientStore } from "../stores/clientStore.js";

const shoppingCartStore = useShoppingCartStore();
const clientStore = useClientStore();

const address = ref("");

async function sendOrder() {
  clientStore.setClient(1);

  // console.log({
  //   clientId: clientStore.clientId,
  //   address: address.value,
  //   price: shoppingCartStore.total,
  //   products: shoppingCartStore.shoppingCart
  // })

  await axios
    .post("http://cherit3.test/send-order", {
      clientId: clientStore.clientId,
      address: address.value,
      price: shoppingCartStore.total,
      products: shoppingCartStore.shoppingCart,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
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
          <button type="submit" @click="sendOrder()">Send order</button>
        </div>
      </div>
    </div>
  </section>
</template>
