<template>
    <q-dialog v-model="user.addTransactionModal" full-width>
        <q-card>
            <q-card-section>
                Ajouter une transaction
            </q-card-section>

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