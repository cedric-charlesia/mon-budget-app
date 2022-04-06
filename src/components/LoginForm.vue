<script setup lang="ts">
import FormItem from "./FormItem.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

import { useToast } from "vue-toastification";

import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

const userStore = loggedInUserStore();

const toast = useToast();

const state = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(
        "Veuillez entrer votre adresse email",
        required
      ),
      email: helpers.withMessage(
        "L'adresse email saisie n'est pas valide",
        email
      ),
    },
    password: {
      required: helpers.withMessage(
        "Veuillez entrer un mot de passe",
        required
      ),
      minLength: helpers.withMessage(
        "Le mot de passe doit avoir un minimum de 8 caractères",
        minLength(8)
      ),
    },
  };
});

const v$ = useValidate(rules, state);

const login = async () => {
  v$.value.$validate();

  if (v$.value.$error) return;

  const formData = new FormData();

  formData.append("email", state.email);
  formData.append("password", state.password);

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

    toast.success("Connecté !");

    return { login: userStore.loginUser(user) };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <FormItem>
    <template #inputText>
      <input v-model.lazy="state.email" type="text" placeholder="Email" />
      <span v-if="v$.email.$error" class="error">{{
        v$.email.$errors[0].$message
      }}</span>
    </template>
    <template #inputPassword>
      <input
        v-model.lazy="state.password"
        type="password"
        placeholder="Mot de passe"
      />
      <span v-if="v$.password.$error" class="error">{{
        v$.password.$errors[0].$message
      }}</span>
    </template>
    <template #formButton>
      <button @click.prevent="login()">Se connecter</button>
    </template>
  </FormItem>
</template>

<style>
.error {
  color: #da1212;
}
</style>
