<template>
    <FormInpuModel>
        <template #inputTextOrEmail>
            <q-input type="email" filled v-model="email" placeholder="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre email']" @keyup.enter="login">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>
        </template>

        <template #inputPassword>
            <q-input type="password" filled v-model="password" placeholder="Mot de passe *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre mot de passe']" @keyup.enter="login">
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

const email = ref('');
const password = ref('');

let userInput = {
    email: '',
    password: '',
}

const login = async () => {

    try {
        userInput.email = email.value;
        userInput.password = password.value;

        user.loginUser(userInput)
    } catch (error) {
        console.error(error)
    }
}
</script>