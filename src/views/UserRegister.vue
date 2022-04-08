<script setup lang="ts">
import FormLoginRegister from "../components/FormLoginRegister.vue";
import { RouterLink } from "vue-router";

</script>

<template>
  <!-- Register form -->
  <form-login-register>
    <template #inputTextOrEmail>
      <ion-item>
        <ion-label position="floating">Prénom</ion-label>
        <ion-input type="text" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="email" required />
      </ion-item>
    </template>

    <template #inputPassword>
      <ion-item>
        <ion-label position="floating">Mot de passe</ion-label>
        <ion-input type="password" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirmer le mot de passe</ion-label>
        <ion-input type="password" required />
      </ion-item>
    </template>

    <template #formButton>
      <ion-button expand="full">S'inscrire</ion-button>
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