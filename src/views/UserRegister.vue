<script setup lang="ts">
import FormLoginRegister from "../components/FormLoginRegister.vue";
import { RouterLink } from "vue-router";

import { userStore } from "@/stores/userStore";

import { IonItem, IonLabel, IonInput, IonButton, IonText, toastController } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';

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

const openToast = async () => {
    const toast = await toastController
        .create({
            message: "Compté créé, vous pouvez vous connecter !",
            position: "top",
            color: "secondary",
            duration: 1500
        })
    return toast.present();
}

const store = userStore();

const state = reactive({
  username: "",
  email: "",
  password: {
    password: "",
    confirmPassword: "",
  },
});

const register = async () => {
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

    openToast();

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
      </ion-item>

      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input @keyup.enter="register()" v-model.lazy="state.email" type="email" required />
      </ion-item>
    </template>

    <template #inputPassword>
      <ion-item>
        <ion-label position="floating">Mot de passe</ion-label>
        <ion-input
          @keyup.enter="register()"
          v-model.lazy="state.password.password"
          type="password"
          required
        />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirmer le mot de passe</ion-label>
        <ion-input
          @keyup.enter="register()"
          v-model.lazy="state.password.confirmPassword"
          type="password"
          required
        />
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