<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

import HomeHeader from "../components/HomeHeader.vue";
import HomeFooter from "../components/HomeFooter.vue";

import UserRegister from "../views/UserRegister.vue";
import UserLogin from "../views/UserLogin.vue";

defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage
  }
});
</script>

<template>
  <ion-page>
    <!-- Header area -->
    <ion-content :fullscreen="true">
      <home-header></home-header>

    <!-- Form area -->
      <user-register v-if="$route.name === 'home'"></user-register>
      <user-login v-else></user-login>
      
    </ion-content>

    <!-- Footer area -->
    <home-footer></home-footer>
  </ion-page>
</template>
