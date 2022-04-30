<template>
    <FormInpuModel>

        <template #inputTextOrEmail>
            <q-input type="text" filled v-model="firstname" placeholder="Pr&eacute;nom *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre prénom']">
                <template v-slot:prepend>
                    <q-icon name="person" />
                </template>
            </q-input>

            <q-input type="email" filled v-model="email" placeholder="Email *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre email']">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>

        </template>

        <template #inputPassword>

            <q-input type="password" filled v-model="password" placeholder="Mot de passe *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Veuiller entrer votre mot de passe']"><template
                    v-slot:prepend>
                    <q-icon name="lock" />
                </template></q-input>

            <q-input type="password" filled v-model="confirmPassword" placeholder="Confirmer votre mot de passe *"
                lazy-rules :rules="[val => val && val.length > 0 || 'Veuiller confirmer votre mot de passe']">
                <template v-slot:prepend>
                    <q-icon name="key" />
                </template>
            </q-input>

        </template>

        <template #formButton>
            <FormButton title="S'inscrire" />
        </template>

    </FormInpuModel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormInpuModel from 'components/forms/FormInputModel.vue';
import FormButton from 'components/buttons/FormButton.vue';
import { defineComponent } from 'vue';

defineComponent({
    name: 'SignUpForm',
});

const firstname = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

</script>