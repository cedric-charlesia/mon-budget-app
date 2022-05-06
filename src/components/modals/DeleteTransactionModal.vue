<template>
    <q-dialog v-model="user.deleteTransactionModal" full-width>
        <q-card>
            <q-card-section>
                Supprimer cette transaction ?
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" v-close-popup />
                <q-btn label="Supprimer" color="negative" v-close-popup @click="deleteTransaction" />
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

const deleteTransaction = async () => {

    const categoryId = Number(user.deleteTransactionId.catId);
    const transactionId = Number(user.deleteTransactionId.transacId);

    try {
        await user.deleteTransaction(categoryId, transactionId);
    } catch (error) {
        console.error(error)
    }
}

</script>