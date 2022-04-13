<script setup lang="ts">
import FormLoginRegister from "../components/FormLoginRegister.vue";
import { RouterLink } from "vue-router";

import { userStore } from "@/stores/userStore";

import { IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';

import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { defineComponent, reactive, computed } from 'vue';

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

const store = userStore();

const state = reactive({
    email: "",
    password: "",
});

const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage(
                "Veuillez entrer votre adresse email",
                required
            ),
            email: helpers.withMessage(
                "L'adresse email saisie n'est pas valide",
                email
            ),
        },
        password: {
            required: helpers.withMessage(
                "Veuillez entrer votre mot de passe",
                required
            ),
            minLength: helpers.withMessage(
                "Le mot de passe doit avoir un minimum de 8 caractères",
                minLength(8)
            ),
        },
    };
});

const v$ = useValidate(rules, state);

const login = async () => {
    v$.value.$validate();

    if (v$.value.$error) return;

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
                <ion-text v-if="v$.email.$error" color="danger">{{
                    v$.email.$errors[0].$message
                }}</ion-text>
                <ion-text v-else-if="store.inputError === true" color="danger">Erreur, vérifiez votre adresse email</ion-text>
            </ion-item>
        </template>

        <template #inputPassword>
            <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input @keyup.enter="login()" v-model.lazy="state.password" type="password" required />
                <ion-text v-if="v$.password.$error" color="danger">{{
                    v$.password.$errors[0].$message
                }}</ion-text>
                <ion-text v-else-if="store.inputError === true" color="danger">Erreur, vérifiez votre mot de passe</ion-text>
            </ion-item>
        </template>

        <template #formButton>
            <ion-button expand="full" @click.prevent="login()" size="large" class="call-to-action-btn">Se connecter</ion-button>
        </template>
    </form-login-register>

    <div class="ion-text-center call-to-action-link">
        <p>Pas encore inscrit ?</p>
        <RouterLink to="/">
            <ion-text color="secondary">S'inscrire</ion-text>
        </RouterLink>
    </div>

    <!-- Ionic Toast (notification) -->
</template>

<style scoped>
ion-item {
  padding-left: 0.3%;
  padding-right: 0.3%;
}
</style>