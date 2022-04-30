<template>
    <FormInpuModel>
        <template #inputTextOrEmail>
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
        </template>

        <template #formButton>
            <FormButton title="Se connecter" />
        </template>

    </FormInpuModel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormInpuModel from 'components/forms/FormInputModel.vue';
import FormButton from 'components/buttons/FormButton.vue';
import { defineComponent } from 'vue';

defineComponent({
    name: 'LogInForm',
});

const email = ref(null);
const password = ref(null);

</script>