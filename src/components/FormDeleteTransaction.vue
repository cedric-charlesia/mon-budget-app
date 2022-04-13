<script setup lang="ts">
import { IonList, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'DeleteTransactionForm',
  components: {
    IonList,
    IonButton
  }
});
</script>

<template>
  <form class="ion-padding">
    <ion-list>

      <slot name="deleteTransaction">
        <p></p>
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
