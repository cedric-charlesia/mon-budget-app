<template>
    <q-dialog v-model="user.deleteTransactionModal" full-width>
        <q-card>
            <q-card-section>
                Supprimer cette transaction ?
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" v-close-popup />
                <q-btn label="Supprimer" color="negative" v-close-popup @click="deleteTransactionModal" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { userStore } from 'stores/userStore';

const user = userStore();

defineComponent({
    name: 'DeleteModal',
    components: {},
});

const deleteTransactionModal = async () => {

    try {
        console.log('Transaction deleted');
    } catch (error) {
        console.error(error)
    }
}

</script>