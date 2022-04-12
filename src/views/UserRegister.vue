<script setup lang="ts">
import FormLoginRegister from "../components/FormLoginRegister.vue";
import { RouterLink } from "vue-router";

import { userStore } from "@/stores/userStore";

import { IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';

import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { defineComponent, reactive, computed } from 'vue';

defineComponent({
  name: 'RegisterForm',
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText
  }
});

const store = userStore();

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

    return { login: store.registerUser(newUser) };

  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <!-- Register form -->
  <form-login-register>
    <template #inputTextOrEmail>
      <ion-item>
        <ion-label position="floating">Prénom</ion-label>
        <ion-input @keyup.enter="register()" v-model.lazy="state.username" type="text" required />
        <ion-text v-if="v$.username.$error" color="danger">{{
          v$.username.$errors[0].$message
        }}</ion-text>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input @keyup.enter="register()" v-model.lazy="state.email" type="email" required />
        <ion-text v-if="v$.email.$error" color="danger">{{
          v$.email.$errors[0].$message
        }}</ion-text>
              <ion-text v-if="store.emailError" color="danger"
        >Cette adresse email est déjà utilisée</ion-text
      >
      </ion-item>
    </template>

    <template #inputPassword>
      <ion-item>
        <ion-label position="floating">Mot de passe</ion-label>
        <ion-input @keyup.enter="register()" v-model.lazy="state.password.password" type="password" required />
        <ion-text v-if="v$.password.password.$error" color="danger">{{
          v$.password.password.$errors[0].$message
        }}</ion-text>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirmer le mot de passe</ion-label>
        <ion-input @keyup.enter="register()" v-model.lazy="state.password.confirmPassword" type="password" required />
        <ion-text v-if="v$.password.confirmPassword.$error" color="danger">{{
          v$.password.confirmPassword.$errors[0].$message
        }}</ion-text>
      </ion-item>
    </template>

    <template #formButton>
      <ion-button expand="full" @click.prevent="register()">S'inscrire</ion-button>
    </template>
  </form-login-register>

  <div class="ion-text-center">
    <p>J'ai déjà un compte ?</p>
    <RouterLink to="/login">
      <ion-text color="secondary">Se connecter</ion-text>
    </RouterLink>
  </div>
</template>

<style scoped>
</style>