<script setup lang="ts">
import { IonTitle, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import { userStore } from "@/stores/userStore";

import FormDeleteTransaction from "../components/FormDeleteTransaction.vue";
import { popoverController } from '@ionic/core';

const store = userStore();

defineComponent({
    name: 'DeleteTransactionModal',
    components: {
        IonTitle,
        IonButton
    }
});

const categoryId = ref(store.transaction.category_id);
const transactionId = ref(store.transaction.id);

const closeModal = async () => {
    await popoverController.dismiss();
};

const deleteTransaction = async () => {
    try {
        await popoverController.dismiss();
        return {
            user: store.deleteTransaction(categoryId.value, transactionId.value),
        };
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <form-delete-transaction>
        <template #deleteTransaction>
            <ion-title>Supprimer cette transaction ?</ion-title>
        </template>
        <template #cancelTransactionButton>
            <ion-button expand="full" @click.prevent="closeModal()" size="large" class="call-to-action-btn space-between">Annuler</ion-button>
        </template>

        <template #addTransactionButton>
            <ion-button expand="full" @click.prevent="deleteTransaction()" size="large" class="call-to-action-btn" color="secondary">Supprimer</ion-button>
        </template>
    </form-delete-transaction>
</template>

<style scoped>
.form-item,
.space-between {
    margin-bottom: 3.5vh;
}

.capitalize {
    text-transform: capitalize;
}

ion-title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 2.5vh;
    color: var(--ion-color-secondary);
}
</style>