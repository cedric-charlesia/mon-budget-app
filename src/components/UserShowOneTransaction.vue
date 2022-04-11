<script setup lang="ts">
import { IonList, IonItem, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

import { userStore } from "@/stores/userStore";

const store = userStore();

defineComponent({
  name: 'UserShowOneTransaction',
  components: {
    IonList,
    IonItem,
    IonText,
  }
});
</script>

<template>
  <ion-item>
    <ion-list>
      <ion-text>Date :</ion-text>
      {{
        new Date(store.transaction.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      }}
    </ion-list>
  </ion-item>

  <ion-item>
    <ion-list class="capitalize">
      <ion-text>Description :</ion-text>
      {{ store.transaction.description }}
    </ion-list>
  </ion-item>

  <ion-item>
    <ion-list>
      <ion-text>Montant :</ion-text>
      {{ store.transaction.amount }} &euro;
    </ion-list>
  </ion-item>

  <ion-item>
    <ion-list class="capitalize">
      <ion-text>Categorie :</ion-text>
      {{ store.category.tag }}
    </ion-list>
  </ion-item>

  <ion-item lines="none">
    <ion-list class="capitalize">
      <ion-text>Type :</ion-text>
      {{ store.category.type }}
    </ion-list>
  </ion-item>
</template>

<style scoped>
ion-text {
  font-weight: bold;
}

.capitalize {
  text-transform: capitalize;
}
</style>