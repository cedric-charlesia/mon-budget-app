<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'UpdateTransactionForm',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
  }
});
</script>

<template>
  <form class="ion-padding">
    <ion-list>
      <slot name="inputDescription">
        <ion-item>
          <ion-label position="floating"></ion-label>
          <ion-input required />
        </ion-item>
      </slot>

      <slot name="transactionType">
        <ion-item>
          <ion-label position="floating"></ion-label>
          <ion-select>
            <ion-select-option></ion-select-option>
          </ion-select>
        </ion-item>
      </slot>

      <slot name="categorySelection">
        <ion-item>
          <ion-label position="floating"></ion-label>
          <ion-select>
            <ion-select-option></ion-select-option>
          </ion-select>
        </ion-item>
      </slot>

      <slot name="transactionDate">
        <ion-item>
          <ion-label position="floating"></ion-label>
          <ion-input required />
        </ion-item>
      </slot>

      <slot name="inputAmount">
        <ion-item>
          <ion-label position="floating"></ion-label>
          <ion-input required />
        </ion-item>
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
