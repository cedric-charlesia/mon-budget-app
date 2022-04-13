<script setup lang="ts">
import { IonButton, IonModal, IonContent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import ModalDeleteTransaction from "../views/ModalDeleteTransaction.vue";

defineComponent({
  name: 'UserDeleteTransaction',
  components: {
    IonButton,
    IonModal,
    IonContent
  }
});

const showDeleteModal = ref(false);
const openModal = (state: boolean) => {
  (showDeleteModal.value = state);
  return { showDeleteModal, openModal, ModalDeleteTransaction };
} 
</script>

<template>
  <ion-button expand="full ion-padding" id="delete-transaction" @click="openModal(true)" size="large" class="call-to-action-btn" color="secondary">Supprimer</ion-button>

  <ion-modal trigger="delete-transaction" :is-open="showDeleteModal" :initialBreakpoint="0.75">
    <ion-content>
      <modal-delete-transaction></modal-delete-transaction>
    </ion-content>
  </ion-modal>
</template>