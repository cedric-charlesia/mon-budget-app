<script setup lang="ts">
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonText } from '@ionic/vue';
import { defineComponent, reactive, computed } from 'vue';

import { userStore } from "@/stores/userStore";

import FormatDate from "@/services/FormatDate";

import FormUpdateTransaction from "../components/FormUpdateTransaction.vue";
import { modalController } from '@ionic/core';

import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const store = userStore();

defineComponent({
    name: 'UpdateTransactionModal',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonText
    }
});

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

const rules = computed(() => {
    return {
        description: {
            required: helpers.withMessage(
                "Veuillez indiquer une description",
                required
            ),
        },
        type: {
            required: helpers.withMessage(
                "Veuillez choisir un type de transaction",
                required
            ),
        },
        category_id: {
            required: helpers.withMessage("Veuillez choisir une catégorie", required),
        },
        amount: {
            required: helpers.withMessage("Veuillez indiquer un montant", required),
        },
        date: {
            required: helpers.withMessage("Veuillez choisir une date", required),
        },
    };
});

const v$ = useValidate(rules, state);

const updateTransaction = async () => {
    v$.value.$validate();

    if (v$.value.$error) return;

    try {
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

                <ion-input @keyup.enter="updateTransaction()" v-model.lazy="state.description" class="capitalize"
                    id="transaction-description" type="text" required />

                <ion-text v-if="v$.description.$error" color="danger">{{
                    v$.description.$errors[0].$message
                }}</ion-text>
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

                <ion-text v-if="v$.type.$error" color="danger">{{
                    v$.type.$errors[0].$message
                }}</ion-text>

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

                <ion-text v-if="v$.category_id.$error" color="danger">{{
                    v$.category_id.$errors[0].$message
                }}</ion-text>

            </ion-item>
        </template>

        <template #transactionDate>
            <ion-item class="form-item">
                <ion-label for="transaction-date" name="transaction-date" position="floating">Date
                </ion-label>

                <ion-input @keyup.enter="updateTransaction()" v-model.lazy="state.date" type="date"
                    id="transaction-date" required slot="end" />

                <ion-text class="block" v-if="v$.date.$error" color="danger">{{
                    v$.date.$errors[0].$message
                }}</ion-text>

            </ion-item>
        </template>

        <template #inputAmount>
            <ion-item class="form-item">
                <ion-label for="transaction-amount" name="transaction-amount" position="floating">Indiquer le montant
                </ion-label>

                <ion-input @keyup.enter="updateTransaction()" v-model.lazy="state.amount" id="transaction-amount"
                    type="number" required />

                <ion-text v-if="v$.amount.$error" color="danger">{{
                    v$.amount.$errors[0].$message
                }}</ion-text>

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