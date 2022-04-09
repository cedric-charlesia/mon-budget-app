<script setup lang="ts">
import { IonFooter, IonText, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'HomeFooter',
  components: {
    IonText,
    IonToolbar,
    IonFooter
  }
});
</script>

<template>
  <ion-footer class="ion-text-center ion-no-border">
    <ion-toolbar>
      <ion-text color="secondary">Mon budget ©2022</ion-text>
    </ion-toolbar>
  </ion-footer>
</template>

<style scoped>
</style>