<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'HomeHeader',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText
  }
});
</script>

<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Mon Budget</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-text color="secondary">
    <h2
      class="subtitle ion-text-center"
    >L'application qui personnalise et gère mon budget en toute simplicité !</h2>
  </ion-text>
</template>

<style scoped>
.subtitle {
  max-width: 85%;
  margin: 8% auto 0 auto;
}
ion-toolbar{
--background: #ffffff;
--border-color: #c1c4cd;
}
</style>