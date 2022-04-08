<script setup lang="ts">
import { IonMenu, IonRouterOutlet, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton, IonMenuToggle } from '@ionic/vue';

import { logOutOutline, logOutSharp } from 'ionicons/icons';

import { userStore } from "@/stores/userStore";
import router from "@/router";

import { defineComponent } from 'vue';

defineComponent({
  name: 'UserConnected',
  components: {
    IonMenu,
    IonRouterOutlet,
    IonContent,
    IonItem,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonMenuToggle
  },
});

const store = userStore();

const logout = () => {
  store.$reset;

  localStorage.removeItem("token");

  router.push({
    name: "login",
  });
};

</script>

<template>
  <ion-menu content-id="main-content" type="overlay">
      <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Mon budget</ion-title>
    </ion-toolbar>
  </ion-header>

    <ion-content>
      <ion-item lines="none">
        <ion-icon slot="start" :ios="logOutOutline" :md="logOutSharp"></ion-icon>
        <ion-menu-toggle>
        <ion-button fill="clear" color="secondary" @click.prevent="logout()" menuClose>Se déconnecter</ion-button>
        </ion-menu-toggle>
      </ion-item>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="main-content"></ion-router-outlet>
</template>

<style scoped>
</style>
