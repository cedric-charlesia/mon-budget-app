<script setup lang="ts">
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, toastController } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';

import { userStore } from "@/stores/userStore";

import FormatDate from "@/services/FormatDate";

import FormUpdateTransaction from "../components/FormUpdateTransaction.vue";
import { modalController } from '@ionic/core';

const store = userStore();

defineComponent({
    name: 'UpdateTransactionModal',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton
    }
});

const openToast = async () => {
    const toast = await toastController
        .create({
            message: "Transaction mise à jour !",
            position: "top",
            color: "success",
            duration: 1500
        })
    return toast.present();
}

const state = reactive({
    description: store.transaction.description,
    type: store.category.type,
    category_id: store.category.id,
    amount: store.transaction.amount,
    date: FormatDate.showDate(store.transaction.date),
});

const closeModal = async () => {
    await modalController.dismiss();
};

const updateTransaction = async () => {

    try {
        openToast();

        await modalController.dismiss();
        return {
            category: store.updateCategory(
                store.category.tag,
                state.type,
                Number(store.category.id)
            ),
            transaction: store.updateTransaction(
                state.date,
                state.description,
                Number(state.amount),
                Number(state.category_id),
                Number(store.transaction.id)
            ),
        };
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <form-update-transaction>
        <template #inputDescription>
            <ion-item class="form-item">
                <ion-label for="transaction-description" name="transaction-description" position="floating">Ajouter une
                    description</ion-label>
                <ion-input @keyup.enter="updateTransaction()" v-model.lazy="state.description" class="capitalize" id="transaction-description" type="text"
                    required />
            </ion-item>
        </template>

        <template #transactionType>
            <ion-item class="form-item">
                <ion-label for="select-type" name="select-type" position="floating">Choisissez le type de transaction
                </ion-label>
                <ion-select v-model.lazy="state.type" name="select-type" id="select-type">
                    <ion-select-option value="revenu">Revenu</ion-select-option>
                    <ion-select-option value="dépense">Dépense</ion-select-option>
                </ion-select>
            </ion-item>
        </template>

        <template #categorySelection>
            <ion-item class="form-item">
                <ion-label for="select-category" name="select-category" position="floating">-- Choisir une categorie ---
                </ion-label>
                <ion-select v-model.lazy="state.category_id" name="select-category" id="select-category">
                    <ion-select-option v-for="category of store.categories" :key="category.id" :value="category.id">{{
                        category.tag.charAt(0).toUpperCase() + category.tag.slice(1)
                    }}</ion-select-option>
                </ion-select>
            </ion-item>
        </template>

        <template #transactionDate>
            <ion-item class="form-item">
                <ion-label for="transaction-date" name="transaction-date" position="floating">Choisir la date
                </ion-label>
                <ion-input @keyup.enter="updateTransaction()" v-model.lazy="state.date" type="date" id="transaction-date" required slot="end" />
            </ion-item>
        </template>

        <template #inputAmount>
            <ion-item class="form-item">
                <ion-label for="transaction-amount" name="transaction-amount" position="floating">Indiquer le montant
                </ion-label>
                <ion-input @keyup.enter="updateTransaction()" v-model.lazy="state.amount" id="transaction-amount" type="number" required />
            </ion-item>
        </template>

        <template #cancelTransactionButton>
            <ion-button class="form-button" expand="full" @click.prevent="closeModal()">Annuler</ion-button>
        </template>

        <template #addTransactionButton>
            <ion-button class="form-button" expand="full" @click.prevent="updateTransaction()">Valider</ion-button>
        </template>
    </form-update-transaction>
</template>

<style scoped>
.form-item,
.form-button {
    margin-bottom: 3.5vh;
}

.capitalize {
    text-transform: capitalize;
}
</style>