<template>
    <div v-if="user.invalidEmailError" class="q-mb-md row justify-center">
        <q-chip removable outline v-model="invalidEmail" color="negative" text-color="white"
            class="bg-deep-orange-1 q-pa-md">
            Email déjà utilis&eacute;
        </q-chip>
    </div>
    <FormInpuModel>

        <template #inputTextOrEmail>
            <q-input type="text" filled v-model="username" placeholder="Pr&eacute;nom *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre prénom']" @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="person" />
                </template>
            </q-input>

            <q-input type="email" filled v-model="email" placeholder="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre email', isValidEmail]"
                @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>

        </template>

        <template #inputPassword>

            <q-input type="password" filled v-model="password" placeholder="Mot de passe *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre mot de passe', val => val && val.length >= 8 || 'Le mot de passe doit avoir 8 caractères min.']"
                @keyup.enter="signup">
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
            </q-input>

            <q-input type="password" filled v-model="confirmPassword" placeholder="Confirmer votre mot de passe *"
                lazy-rules :rules="[val => val && val === password || 'Veuiller confirmer votre mot de passe']"
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

const invalidEmail = ref(true);

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

let userInput = {
    username: '',
    email: '',
    password: '',
};

const isValidEmail = (val: string) => {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Email invalide';
};

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