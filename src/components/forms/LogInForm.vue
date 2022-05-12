<template>
    <div v-if="user.inputError" class="q-mb-md row justify-center">
        <q-chip removable outline v-model="usernameOrPasswordError" color="negative" text-color="white"
            class="bg-deep-orange-1 q-pa-md">
            Email ou mot de passe incorrect
        </q-chip>
    </div>
    <FormInpuModel>
        <template #inputTextOrEmail>
            <q-input type="email" filled v-model="email" placeholder="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre email', isValidEmail]"
                @keyup.enter="login">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>
        </template>

        <template #inputPassword>
            <q-input type="password" filled v-model="password" placeholder="Mot de passe *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre mot de passe', val => val && val.length >= 8 || 'Le mot de passe doit avoir 8 caractères min.']"
                @keyup.enter="login">
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
            </q-input>
        </template>

        <template #formButton>
            <FormButton title="Se connecter" @click.prevent="login" />
        </template>

    </FormInpuModel>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

import FormInpuModel from 'components/forms/FormInputModel.vue';
import FormButton from 'components/buttons/FormButton.vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'LogInForm',
});

const usernameOrPasswordError = ref(true);

const email = ref('');
const password = ref('');

let userInput = {
    email: '',
    password: '',
};

const isValidEmail = (val: string) => {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Email invalide';
};

const login = async () => {

    try {
        userInput.email = email.value;
        userInput.password = password.value;

        await user.loginUser(userInput);
    } catch (error) {
        console.error(error)
    }

}
</script>