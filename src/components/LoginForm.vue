<script setup lang="ts">
import FormItem from "./FormItem.vue";
import { ref } from "vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

const email = ref("");
const password = ref("");

const login = async () => {
  const formData = new FormData();

  formData.append("email", email.value);
  formData.append("password", password.value);

  try {
    interface User {
      email: string;
      password: string;
      [key: string]: string;
    }

    let user: User = {
      email: "",
      password: "",
    };

    for (let [key, val] of formData.entries()) {
      user[`${key}`] = `${val}`;
      JSON.stringify(user);
    }
    const userStore = loggedInUserStore();
    return { login: userStore.loginUser(user) };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <FormItem>
    <template #inputText>
      <input v-model.lazy="email" type="text" placeholder="Email" />
    </template>
    <template #inputPassword>
      <input
        v-model.lazy="password"
        type="password"
        placeholder="Mot de passe"
      />
    </template>
    <template #formButton>
      <button @click.prevent="login()">Se connecter</button>
    </template>
  </FormItem>
</template>
