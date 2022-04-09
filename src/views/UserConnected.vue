<script setup lang="ts">
import { IonContent, IonPage, IonCard } from '@ionic/vue';
import { defineComponent } from 'vue';

import UserHeader from "../components/UserHeader.vue";
import HomeFooter from "../components/HomeFooter.vue";

import UserMonthPicker from "../components/UserMonthPicker.vue";
import UserAccountSummary from "../components/UserAccountSummary.vue";
import UserShowTransactions from "../components/UserShowTransactions.vue";
import UserAddTransaction from "../components/UserAddTransaction.vue";

import { userStore } from "@/stores/userStore";

const store = userStore();

defineComponent({
  name: 'UserConnected',
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
      <user-header></user-header>

      <!-- Content area -->
      <user-month-picker></user-month-picker>

      <user-account-summary></user-account-summary>

      <ion-card v-if="store.transactions.length === 0" class="no-transaction">
        <h2>Rien à afficher pour le moment</h2>
        <p>Cliquez sur le bouton pour commencer</p>
      </ion-card>

      <ion-card v-else>
        <user-show-transactions></user-show-transactions>
      </ion-card>

      <user-add-transaction></user-add-transaction>
    </ion-content>

    <!-- Footer area -->
    <home-footer></home-footer>
  </ion-page>
</template>

<style scoped>
ion-card {
  height: 45vh;
  overflow-y: auto;
  border: 0.15rem solid var(--ion-color-secondary);
  color: var(--ion-color-secondary);
  margin-bottom: 2vh;
}

.no-transaction {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
}
</style>
