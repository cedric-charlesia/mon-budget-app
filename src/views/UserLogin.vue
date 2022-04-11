<script setup lang="ts">
import FormLoginRegister from "../components/FormLoginRegister.vue";
import { RouterLink } from "vue-router";

import { userStore } from "@/stores/userStore";

import { IonItem, IonLabel, IonInput, IonButton, IonText, toastController } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';

defineComponent({
    name: 'LoginForm',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonText
    }
});

const openToast = async () => {
    const toast = await toastController
        .create({
            message: "Connecté !",
            position: "top",
            color: "secondary",
            duration: 1500
        })
    return toast.present();
}

const store = userStore();

const state = reactive({
    email: "",
    password: "",
});

const login = async () => {
    const formData = new FormData();

    formData.append("email", state.email);
    formData.append("password", state.password);

    try {
        interface User {
            email: string;
            password: string;
            [key: string]: string;
        }

        let user: User = {
            email: "",
            password: "",
        };

        for (let [key, val] of formData.entries()) {
            user[`${key}`] = `${val}`;
            JSON.stringify(user);
        }

        openToast();

        return { login: store.loginUser(user) };

    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <!-- Login form -->
    <form-login-register>
        <template #inputTextOrEmail>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input @keyup.enter="login()" v-model.lazy="state.email" type="text" required />
            </ion-item>
        </template>

        <template #inputPassword>
            <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input @keyup.enter="login()" v-model.lazy="state.password" type="password" required />
            </ion-item>
        </template>

        <template #formButton>
            <ion-button expand="full" @click.prevent="login()">Se connecter</ion-button>
        </template>
    </form-login-register>

    <div class="ion-text-center">
        <p>Pas encore inscrit ?</p>
        <RouterLink to="/">
            <ion-text color="secondary">S'inscrire</ion-text>
        </RouterLink>
    </div>

    <!-- Ionic Toast (notification) -->
</template>

<style scoped>
</style>