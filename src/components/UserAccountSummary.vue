<script setup lang="ts">
import { IonListHeader, IonList, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

import { userStore } from "@/stores/userStore";

defineComponent({
  name: 'UserHeader',
  components: {
    IonList,
    IonListHeader,
    IonText
  }
});

const store = userStore();

</script>

<template>
  <div class="transaction-summary-container">
    <ion-list>
      <ion-list-header>Revenus</ion-list-header>
      <ion-text class="summary-container income">{{ store.getTotalIncomeOrExpense("revenu") }} &euro;</ion-text>
    </ion-list>

    <ion-list>
      <ion-list-header>Dépenses</ion-list-header>
      <ion-text class="summary-container expense">{{ store.getTotalIncomeOrExpense("dépense") }} &euro;</ion-text>
    </ion-list>

    <ion-list>
      <ion-list-header>Total</ion-list-header>
      <ion-text class="summary-container total">{{ Number(store.getTotalIncomeOrExpense("revenu")) - Number(store.getTotalIncomeOrExpense("dépense")) }} &euro;</ion-text>
    </ion-list>
  </div>
</template>

<style scoped>
.transaction-summary-container {
  display: flex;
  justify-content: space-between;
  width: 85vw;
  margin: auto;
}

.summary-container {
  font-weight: bold;
}

.income {
  color: var(--income-color);
}

.expense {
  color: var(--expense-color);
}

.total {
  color: var(--total-color);
}

ion-list-header {
  padding: 0;
  font-size: 1rem;
}
</style>