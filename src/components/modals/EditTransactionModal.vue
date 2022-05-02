<template>
    <q-dialog v-model="user.editTransaction" full-width>
        <q-card>
            <q-bar class="row items-center q-pb-none bg-primary text-white">
                <div class="text-h6">Modifier</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-bar>

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