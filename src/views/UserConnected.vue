<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent} from 'vue';

import UserHeader from "../components/UserHeader.vue";
import HomeFooter from "../components/HomeFooter.vue";

import UserMonthPicker from "../components/UserMonthPicker.vue";
import UserAccountSummary from "../components/UserAccountSummary.vue";
import UserTransactionDetails from "../components/UserTransactionDetails.vue";

defineComponent({
  name: 'UserConnected',
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
      <user-header></user-header>

      <!-- Content area -->
      <user-month-picker></user-month-picker>
      <user-account-summary></user-account-summary>
      <user-transaction-details></user-transaction-details>


    </ion-content>

    <!-- Footer area -->
    <home-footer></home-footer>
  </ion-page>
</template>

<style scoped>
</style>
