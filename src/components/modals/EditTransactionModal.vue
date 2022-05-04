<template>
    <q-dialog v-model="user.editTransactionModal" full-width>
        <q-card>
            <q-card-section>
                Modifier cette transaction
            </q-card-section>

            <q-card-section>
                <EditTransactionForm />
            </q-card-section>

        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import EditTransactionForm from '../forms/EditTransactionForm.vue';

import { userStore } from 'stores/userStore';

const user = userStore();

defineComponent({
    name: 'EditModal',
    components: {},
});

</script>