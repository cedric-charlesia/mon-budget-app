<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

import HomeHeader from "../components/HomeHeader.vue";
import HomeFooter from "../components/HomeFooter.vue";
import UserRegister from "../components/UserRegister.vue";

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

    <!-- Content area -->
    <ion-content :fullscreen="true">
      <home-header></home-header>

      <user-register></user-register>
      
    </ion-content>

    <!-- Footer area -->
    <home-footer></home-footer>
  </ion-page>
</template>

<style scoped>
</style>
