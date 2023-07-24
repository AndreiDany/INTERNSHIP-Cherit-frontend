import { defineStore } from "pinia";

export const useUsersStore = defineStore("usersStore", {
  state: () => {
    return {
      users: [],
    };
  },
  actions: {},
});
