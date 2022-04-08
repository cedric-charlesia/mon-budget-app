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
            <slot name="inputTextOrEmail">
                <ion-item>
                    <ion-label position="floating"></ion-label>
                    <ion-input required />
                </ion-item>
            </slot>

            <slot name="inputPassword">
                <ion-item>
                    <ion-label position="floating"></ion-label>
                    <ion-input type="password" required />
                </ion-item>
            </slot>
        </ion-list>
        <slot name="formButton">
            <ion-button expand="full"></ion-button>
        </slot>
    </form>
</template>