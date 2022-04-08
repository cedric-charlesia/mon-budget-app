<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/vue';
import { defineComponent } from 'vue';


import { userStore } from "@/stores/userStore";

defineComponent({
  name: 'UserHeader',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton
  }
});

const store = userStore();

</script>

<template>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-menu-button color="secondary"></ion-menu-button>
        </ion-buttons>
          <ion-title>Budget de {{ store.username }}</ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<style scoped>

</style>