<script setup lang="ts">
import { IonButton, IonModal, IonContent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import ModalUpdateTransaction from "../views/ModalUpdateTransaction.vue";

defineComponent({
  name: 'UserUpdateTransaction',
  components: {
    IonButton,
    IonModal,
    IonContent
  }
});

const showUpdateModal = ref(false);
const openModal = (state: boolean) => {
  (showUpdateModal.value = state);
  return { showUpdateModal, openModal, ModalUpdateTransaction };
} 
</script>

<template>
  <ion-button expand="full ion-padding" id="update-transaction" @click="openModal(true)" size="large" class="call-to-action-btn">Modifier</ion-button>

  <ion-modal trigger="update-transaction" :is-open="showUpdateModal">
    <ion-content>
      <modal-update-transaction></modal-update-transaction>
    </ion-content>
  </ion-modal>
</template>