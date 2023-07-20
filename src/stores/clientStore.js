import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useClientStore = defineStore("clientStore", {
  state: () => {
    return {
      clientName: Cookies.get("clientName") || "",
      clientToken: Cookies.get("userToken") || "",
      isAdmin: Cookies.get("isAdmin") || "false",
    };
  },
  actions: {
    setClientName(name) {
      //setarea numelui clientului
      this.clientName = String(name);

      Cookies.set("clientName", this.clientName.toString());
    },
    setToken(token) {
      //setarea tokenului clientului
      this.clientToken = String(token);

      Cookies.set("userToken", this.clientToken.toString());
    },
    setAdmin(isAdmin) {
      //atribuirea scopului
      this.isAdmin = String(isAdmin);

      Cookies.set("isAdmin", this.isAdmin.toString());
    },
  },
});
