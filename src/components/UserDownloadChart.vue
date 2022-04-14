<script setup lang="ts">
import { IonButton, IonModal, IonContent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import ModalAddTransaction from "../views/ModalAddTransaction.vue";

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
return { showModal, openModal, ModalAddTransaction };
} 
</script>

<template>
  <ion-button expand="full ion-padding" id="add-transaction" @click="openModal(true)" size="large" class="call-to-action-btn">Télécharger</ion-button>

  <ion-modal trigger="add-transaction" :is-open="showModal">
  <ion-content><modal-add-transaction></modal-add-transaction></ion-content>
</ion-modal>
</template>