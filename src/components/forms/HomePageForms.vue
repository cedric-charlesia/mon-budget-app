<template>
    <q-card class="q-mx-md" square>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="login" label="Se connecter" />
            <q-tab name="signup" label="S'inscrire" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">
                <LogInForm />

            </q-tab-panel>
            <q-tab-panel name="signup">
                <SignUpForm />

            </q-tab-panel>
        </q-tab-panels>
    </q-card>
</template>

<script setup lang="ts">
import LogInForm from 'components/forms/LogInForm.vue';
import SignUpForm from 'components/forms/SignUpForm.vue';

import { defineComponent, ref } from 'vue';

defineComponent({
    name: 'HomePageForms',
});

const tab = ref('login');

</script>