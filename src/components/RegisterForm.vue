<script setup lang="ts">
import FormItem from "./FormItem.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

const userStore = loggedInUserStore();

const state = reactive({
  username: "",
  email: "",
  password: {
    password: "",
    confirmPassword: "",
  },
});

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Veuillez entrer votre prénom", required),
    },
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
      confirmPassword: {
        required: helpers.withMessage(
          "Veuillez confirmer votre mot de passe",
          required
        ),
        sameAs: helpers.withMessage(
          "Les mots de passe ne sont pas identiques",
          sameAs(state.password.password)
        ),
      },
    },
  };
});

const v$ = useValidate(rules, state);

const register = async () => {
  v$.value.$validate();

  if (v$.value.$error) return;

  const formData = new FormData();

  formData.append("username", state.username);
  formData.append("email", state.email);
  if (state.password.password === state.password.confirmPassword) {
    formData.append("password", state.password.password);
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

    return { login: userStore.registerUser(newUser) };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <FormItem>
    <template #inputText>
      <input v-model.lazy="state.username" type="text" placeholder="Prénom" />
      <span v-if="v$.username.$error">{{
        v$.username.$errors[0].$message
      }}</span>
      <input v-model.lazy="state.email" type="text" placeholder="Email" />
      <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
      <span v-if="userStore.emailError"
        >Cette adresse email est déjà utilisée</span
      >
    </template>
    <template #inputPassword>
      <input
        v-model.lazy="state.password.password"
        type="password"
        placeholder="Mot de passe"
      />
      <span v-if="v$.password.password.$error">{{
        v$.password.password.$errors[0].$message
      }}</span>
      <input
        v-model.lazy="state.password.confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
      />
      <span v-if="v$.password.confirmPassword.$error">{{
        v$.password.confirmPassword.$errors[0].$message
      }}</span>
    </template>
    <template #formButton>
      <button @click.prevent="register()">S'inscrire</button>
    </template>
  </FormItem>
</template>
