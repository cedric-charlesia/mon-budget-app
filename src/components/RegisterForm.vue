<script setup lang="ts">
import FormItem from "./FormItem.vue";
import { ref } from "vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = async () => {
  const formData = new FormData();

  formData.append("username", username.value);
  formData.append("email", email.value);
  if (password.value === confirmPassword.value) {
    formData.append("password", password.value);
  }

  try {
    interface User {
      username: string;
      email: string;
      password: string;
      [key: string]: string;
    }

    let newUser: User = {
      username: "",
      email: "",
      password: "",
    };

    for (let [key, val] of formData.entries()) {
      newUser[`${key}`] = `${val}`;
      JSON.stringify(newUser);
    }
    const userStore = loggedInUserStore();
    return { login: userStore.registerUser(newUser) };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <FormItem>
    <template #inputText>
      <input v-model.lazy="username" type="text" placeholder="Prénom" />
      <input v-model.lazy="email" type="text" placeholder="Email" />
    </template>
    <template #inputPassword>
      <input
        v-model.lazy="password"
        type="password"
        placeholder="Mot de passe"
      />
      <input
        v-model.lazy="confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
      />
    </template>
    <template #formButton>
      <button @click.prevent="register()">S'inscrire</button>
    </template>
  </FormItem>
</template>
