<template>
    <q-dialog v-model="user.addTransactionModal" full-width>
        <q-card>
            <q-bar class="row items-center q-pb-none bg-primary text-white">
                <div class="text-h6">Ajouter</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-bar>

            <q-card-section>
                <AddTransactionForm />
            </q-card-section>

        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import AddTransactionForm from '../forms/AddTransactionForm.vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'AddTransactionModal',
    components: {},
});

</script>