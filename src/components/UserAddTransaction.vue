<script setup lang="ts">
import { IonButton, IonModal, IonContent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import AddTransactionModal from "../views/AddTransactionModal.vue";

defineComponent({
  name: 'UserAddTransaction',
  components: {
    IonButton,
    IonModal,
    IonContent
  }
});

const showModal = ref(false);
const openModal = (state: boolean) => {
  (showModal.value = state);
return { showModal, openModal, AddTransactionModal };
} 
</script>

<template>
  <ion-button expand="full ion-padding" id="add-transaction" @click="openModal(true)">Ajouter un montant</ion-button>

  <ion-modal trigger="add-transaction" :is-open="showModal">
  <ion-content><add-transaction-modal></add-transaction-modal></ion-content>
</ion-modal>
</template>

<style scoped>
</style>