<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");
const password = ref("");
const cPassword = ref("");
const message = ref("Datele din formular sunt incorecte!");

async function register() {
  if (email.value != "" && password.value != "") {
    await axios
      .post("http://cherit3.test/register", {
        name: name.value,
        email: email.value,
        password: password.value,
        c_password: cPassword.value,
      })
      .then(function (response) {
        console.log(response.data);

        if (response.data.message == "error") {
          message.value = "Datele din formular sunt incorecte!";
        } else {
          message.value = "Client inregistrat cu succes!";
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<template>
  <section id="contact" class="col contact">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <p class="mt-2">Register</p>
      </div>

      <div class="php-email-form p-3 p-md-4">
        <div class="row">
          <div class="col-xl-6 form-group">
            <input
              type="text"
              name="name"
              class="form-control"
              id="name"
              v-model="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div class="col-xl-6 form-group">
            <input
              type="text"
              name="phone"
              class="form-control"
              id="phone"
              placeholder="Phone number"
              required
            />
          </div>
          <div class="col-xl-6 form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              id="email"
              v-model="email"
              placeholder="Your Email"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            name="password"
            id="password1"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            name="password"
            id="password2"
            v-model="cPassword"
            placeholder="Password"
            required
          />
        </div>
        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="register()"
          >
            Register
          </button>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
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
  </section>
</template>
