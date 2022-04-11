<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonMenuButton } from '@ionic/vue';
import { defineComponent } from 'vue';


import { userStore } from "@/stores/userStore";

defineComponent({
  name: 'UserHeader',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonMenuButton
  }
});

const store = userStore();

</script>

<template>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
        <ion-back-button defaultHref="user" color="secondary"></ion-back-button>
      </ion-buttons>
        <ion-buttons slot="end">
          <ion-menu-button color="secondary"></ion-menu-button>
        </ion-buttons>
          <ion-title>Budget de {{ store.username }}</ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<style scoped>

</style>