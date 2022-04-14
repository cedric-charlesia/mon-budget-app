<script setup lang="ts">
import { IonItem } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import { userStore } from "@/stores/userStore";

defineComponent({
  name: 'UserMonthPicker',
  components: {
    IonItem,
  }
});

const store = userStore();

let month = ref("");

const refreshTransactions = () => {
  store.currentMonthChart = month.value;
  store.isChartVisible = true;
  store.showChartData()
};

</script>

<template>
  <ion-item lines="none" class="calendar">
    <input
      v-model.lazy="month"
      type="month"
      id="currentMonth"
      name="currentMonth"
      class="input-calendar"
      @change="refreshTransactions()"
    />
  </ion-item>
</template>

<style scoped>
.calendar {
  width: 50vw;
  color: var(--ion-color-secondary);
  font-weight: bold;
}
ion-item {
  border: 0.15rem solid var(--ion-color-secondary);
  border-radius: 0.15rem;
  margin-top: 2%;
  margin-left: 1rem;
}
.input-calendar {
  border: none;
}
</style>