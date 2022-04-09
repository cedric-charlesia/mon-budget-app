<script setup lang="ts">
import { IonItem, IonInput } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import { userStore } from "@/stores/userStore";

defineComponent({
  name: 'UserHeader',
  components: {
    IonItem,
    IonInput
  }
});

const store = userStore();

let getCurrentMonth = "";

const now = Date.now();
if (new Date(now).getMonth() + 1 < 10) {
  getCurrentMonth = `${new Date(now).getFullYear()}-0${new Date(now).getMonth() + 1
    }`;
} else {
  getCurrentMonth = `${new Date(now).getFullYear()}-${new Date(now).getMonth() + 1
    }`;
}

let month = ref(getCurrentMonth);

const refreshTransactions = () => {
  store.currentMonth = month.value;
};

</script>

<template>
  <ion-item lines="none" class="calendar">
    <ion-input
      v-model.lazy="month"
      type="month"
      id="currentMonth"
      name="currentMonth"
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
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 20px;
}
</style>