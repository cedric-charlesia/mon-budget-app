<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'RegisterForm',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  }
});
</script>

<template>
  <form class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-label position="floating">Prénom</ion-label>
        <ion-input type="text" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="email" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Mot de passe</ion-label>
        <ion-input type="password" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirmer le mot de passe</ion-label>
        <ion-input type="password" required />
      </ion-item>
    </ion-list>
      <ion-button expand="full">S'inscrire</ion-button>
  </form>
</template>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>