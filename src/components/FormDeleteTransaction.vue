<script setup lang="ts">
import { IonList, IonTitle, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'DeleteTransactionForm',
  components: {
    IonList,
    IonTitle,
    IonButton
  }
});
</script>

<template>
  <form class="ion-padding">
    <ion-list>

      <slot name="deleteTransaction">
        <ion-title></ion-title>
      </slot>
      <slot name="cancelTransactionButton">
        <ion-button expand="full"></ion-button>
      </slot>

      <slot name="addTransactionButton">
        <ion-button expand="full"></ion-button>
      </slot>
    </ion-list>
  </form>
</template>

<style scoped>
</style>
