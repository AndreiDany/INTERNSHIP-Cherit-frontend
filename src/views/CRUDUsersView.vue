<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useClientStore } from "../stores/clientStore.js";
import { useUsersStore } from "../stores/usersStore.js";

const clientStore = useClientStore();

const usersStore = useUsersStore();

const userId = ref(0);
const userName = ref("");

const newUserName = ref("");
const newUserEmail = ref("");
const newUserPassword = ref("");
const newUserCPassword = ref("");

const message = ref("");

onMounted(() => {
  axios
    .get("http://cherit3.test/users", {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      usersStore.users = response.data.slice();
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
});

function addUser() {
  axios
    .post(
      "http://cherit3.test/register",
      {
        name: newUserName.value,
        email: newUserEmail.value,
        password: newUserPassword.value,
        c_password: newUserCPassword.value,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      usersStore.users.push({
        name: newUserName.value,
        email: newUserEmail.value,
      });
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });

  //newUserName.value = "";
  //newUserEmail.value = "";
}

function editUser() {
  axios
    .post(
      "http://cherit3.test/user/" + userId.value,
      {
        name: newUserName.value,
        email: newUserEmail.value,
      },
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
      const productIndex = usersStore.users.findIndex(
        user => user.id == userId.value
      );
      if (productIndex !== -1) {
        usersStore.users[productIndex].name = newUserName.value;
        usersStore.users[productIndex].email = newUserEmail.value;
      }
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
}

function deleteUser() {
  axios
    .delete("http://cherit3.test/user/" + userId.value, {
      headers: {
        Authorization: "Bearer " + clientStore.clientToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      usersStore.users.splice(
        usersStore.users.findIndex(item => item.id == userId.value),
        1
      );
      message.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      message.value = "Eroare!";
    });
}

function makeAdmin() {
  axios
    .post(
      "http://cherit3.test/admin/" + userId.value,
      {},
      {
        headers: {
          Authorization: "Bearer " + clientStore.clientToken,
          Accept: "application/json",
        },
      }
    )
    .then(function (response) {
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
              <h2>CRUD <b>Users</b></h2>
            </div>
            <div class="col-sm-6">
              <button
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#addUser"
                @click="
                  (newUserName = ''),
                    (newUserEmail = ''),
                    (newUserPassword = ''),
                    (newUserCPassword = '')
                "
              >
                <i class="bi bi-plus-circle-fill"></i>
                <span>Add New User</span>
              </button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersStore.users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button
                  class="btn btn-outline-dark me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editUser"
                  @click="
                    (userId = user.id),
                      (userName = user.name),
                      (newUserName = user.name),
                      (newUserEmail = user.email)
                  "
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-outline-dark me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteUser"
                  @click="(userId = user.id), (userName = user.name)"
                >
                  <i class="bi bi-trash"></i>
                </button>
                <button
                  class="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#makeAdmin"
                  @click="(userId = user.id), (userName = user.name)"
                >
                  <i class="bi bi-person-lock"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Add User -->
    <div
      class="modal fade"
      id="addUser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add a user</h1>
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
              v-model="newUserName"
              type="text"
              class="input-group-text"
              placeholder="User name"
            />
            <br />
            <h5>Email</h5>
            <input
              v-model="newUserEmail"
              type="text"
              class="input-group-text"
              placeholder="User email"
            />
            <br />
            <h5>Password</h5>
            <input
              v-model="newUserPassword"
              type="text"
              class="input-group-text"
              placeholder="User password"
            />
            <br />

            <h5>cPassword</h5>
            <input
              v-model="newUserCPassword"
              type="text"
              class="input-group-text"
              placeholder="User cPassword"
            />
            <br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="addUser()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit User -->
    <div
      class="modal fade"
      id="editUser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ userName }}
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
              v-model="newUserName"
              type="text"
              class="input-group-text"
              placeholder="User name"
            />
            <br />
            <h5>Email</h5>
            <input
              v-model="newUserEmail"
              type="text"
              class="input-group-text"
              placeholder="User email"
            />
            <br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="editUser()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Delete User -->
    <div
      class="modal fade"
      id="deleteUser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Esti sigur ca vrei sa stergi clientul "{{ userName }}"
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
              @click="deleteUser()"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Make Admin -->
    <div
      class="modal fade"
      id="makeAdmin"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Esti sigur ca vrei sa numesti admin pe "{{ userName }}"
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
              @click="makeAdmin()"
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
