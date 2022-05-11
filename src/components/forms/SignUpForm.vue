<template>
    <FormInpuModel>

        <template #inputTextOrEmail>
            <q-input type="text" filled v-model="username" placeholder="Pr&eacute;nom *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre prénom']" @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="person" />
                </template>
            </q-input>

            <q-input type="email" filled v-model="email" placeholder="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre email']" @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>

        </template>

        <template #inputPassword>

            <q-input type="password" filled v-model="password" placeholder="Mot de passe *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre mot de passe']" @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
            </q-input>

            <q-input type="password" filled v-model="confirmPassword" placeholder="Confirmer votre mot de passe *"
                lazy-rules :rules="[val => val && val.length > 0 || 'Veuiller confirmer votre mot de passe']"
                @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="key" />
                </template>
            </q-input>

        </template>

        <template #formButton>
            <FormButton title="S'inscrire" @click="signup" />
        </template>

    </FormInpuModel>
</template>

<script setup lang="ts">
import FormInpuModel from 'components/forms/FormInputModel.vue';
import FormButton from 'components/buttons/FormButton.vue';

import { defineComponent, ref } from 'vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'SignUpForm',
});

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

let userInput = {
    username: '',
    email: '',
    password: '',
}

const signup = async () => {

    try {
        userInput.username = username.value;
        userInput.email = email.value;

        if (password.value === confirmPassword.value) {
            userInput.password = password.value;
        }

        await user.registerUser(userInput);
    } catch (error) {
        console.error(error)
    }
}
</script>