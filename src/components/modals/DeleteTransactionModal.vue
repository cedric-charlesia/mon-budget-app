<template>
    <q-dialog v-model="user.deleteTransactionModal" full-width>
        <q-card>
            <q-bar class="row items-center q-pb-none bg-primary text-white">
                <div class="text-h6">Supprimer</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-bar>

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