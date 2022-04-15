<script setup lang="ts">
import { IonContent, IonPage, IonCard } from '@ionic/vue';
import { defineComponent } from 'vue';

import UserChartHeader from "../components/UserChartHeader.vue";
import HomeFooter from "../components/HomeFooter.vue";

import UserMonthPickerChart from "../components/UserMonthPickerChart.vue";
import UserShowChartDetails from "../components/UserShowChartDetails.vue";
// import UserDownloadChart from "../components/UserDownloadChart.vue";

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
      <user-chart-header></user-chart-header>

      <!-- Content area -->
      <user-month-picker-chart></user-month-picker-chart>

      <ion-card v-if="store.transactions.length === 0" class="no-transaction">
        <h2 class="ion-text-center">Rien à afficher pour le moment</h2>
      </ion-card>

      <ion-card v-else>
        <user-show-chart-details></user-show-chart-details>
      </ion-card>

      <!-- <user-download-chart></user-download-chart> -->
    </ion-content>

    <!-- Footer area -->
    <home-footer></home-footer>
  </ion-page>
</template>

<style scoped>
ion-card {
  margin-bottom: 12%;
  box-shadow: none;
}

.no-transaction {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
}
</style>
