<script setup lang="ts">
import { IonContent, IonPage, IonCard } from '@ionic/vue';
import { defineComponent } from 'vue';

import UserTransactionHeader from "../components/UserTransactionHeader.vue";
import HomeFooter from "../components/HomeFooter.vue";

import UserShowOneTransaction from "../components/UserShowOneTransaction.vue";

import UserUpdateTransaction from "../components/UserUpdateTransaction.vue";
import UserDeleteTransaction from "../components/UserDeleteTransaction.vue";

defineComponent({
  name: 'UserTransactionDetails',
  components: {
    IonContent,
    IonPage,
    IonCard
  }
});

</script>

<template>
  <ion-page>
    <!-- Header area -->
    <ion-content :fullscreen="true">
      <user-transaction-header></user-transaction-header>

      <!-- Content area -->
      <ion-card>
        <user-show-one-transaction></user-show-one-transaction>
      </ion-card>

      <user-update-transaction></user-update-transaction>

      <user-delete-transaction></user-delete-transaction>
      
</ion-content>
    <!-- Footer area -->
    <home-footer></home-footer>
  </ion-page>
</template>
