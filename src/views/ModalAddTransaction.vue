<script setup lang="ts">
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonText } from '@ionic/vue';
import { defineComponent, reactive, computed } from 'vue';

import { userStore } from "@/stores/userStore";

import FormAddTransaction from "../components/FormAddTransaction.vue";
import { modalController } from '@ionic/core';

import useValidate from "@vuelidate/core";
import { required, requiredUnless, helpers } from "@vuelidate/validators";

const store = userStore();

defineComponent({
    name: 'AddTransactionModal',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonText
    },
});

const state = reactive({
    type: "",
    category_id: "",
    tag: "",
    date: "",
    description: "",
    amount: "",
});

const closeModal = async () => {
    await modalController.dismiss();
};

const optionalInputTag = () => state.tag != "";
const optionalInputCategory = () => state.category_id != "";

const rules = computed(() => {
    return {
        type: {
            required: helpers.withMessage(
                "Veuillez choisir un type de transaction",
                required
            ),
        },
        category_id: {
            requiredUnless: helpers.withMessage(
                "Veuillez choisir une catégorie",
                requiredUnless(optionalInputTag)
            ),
        },
        tag: {
            requiredUnless: helpers.withMessage(
                "Veuillez indiquer une catégorie",
                requiredUnless(optionalInputCategory)
            ),
        },
        date: {
            required: helpers.withMessage("Veuillez indiquer une date", required),
        },
        description: {
            required: helpers.withMessage(
                "Veuillez indiquer une description",
                required
            ),
        },
        amount: {
            required: helpers.withMessage("Veuillez indiquer un montant", required),
        },
    };
});

const v$ = useValidate(rules, state);

const addTransaction = async () => {
    v$.value.$validate();

    if (v$.value.$error) return;

    const formDataCategory = new FormData();
    const formDataTransaction = new FormData();

    formDataCategory.append("type", state.type);
    formDataCategory.append("tag", state.tag);

    formDataTransaction.append("category_id", state.category_id);
    formDataTransaction.append("date", state.date);
    formDataTransaction.append("description", state.description);
    formDataTransaction.append("amount", state.amount);

    try {
        interface Category {
            type: string;
            tag: string;
            user_id: number;
            [key: string]: number | string;
        }

        let category: Category = {
            type: "",
            tag: "",
            user_id: store.id,
        };

        for (let [key, val] of formDataCategory.entries()) {
            category[`${key}`] = `${val}`;
            JSON.stringify(category);
        }

        interface Transaction {
            category_id: number;
            date: string;
            description: string;
            amount: number;
            check: string;
            [key: string]: number | string;
        }

        let transaction: Transaction = {
            category_id: NaN,
            date: "",
            description: "",
            amount: NaN,
            check: "false",
        };

        for (let [key, val] of formDataTransaction.entries()) {
            transaction[`${key}`] = `${val}`;
            JSON.stringify(transaction);
        }

        await modalController.dismiss();

        return { user: store.addTransaction(category, transaction) };
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <form-add-transaction>
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
                <ion-label for="select-category" name="select-category" position="floating">Retrouvez vos catégories ici
                </ion-label>

                <ion-select v-model.lazy="state.category_id" name="select-category" :disabled="state.tag !== ''"
                    id="select-category">
                    <ion-select-option v-for="category of store.categories" :key="category.id" :value="category.id">{{
                        category.tag.charAt(0).toUpperCase() + category.tag.slice(1)
                    }}</ion-select-option>
                </ion-select>

                <ion-text :class="state.tag !== '' ? 'hide' : 'show'" v-if="v$.category_id.$error" color="danger">{{
                    v$.category_id.$errors[0].$message
                }}</ion-text>
            </ion-item>
        </template>

        <template #inputCategory>
            <ion-item class="form-item">
                <ion-label for="add-category" name="add-category" position="floating">Si la catégorie n'existe pas,
                    créez-là</ion-label>

                <ion-input v-model.lazy="state.tag" type="text" :disabled="state.category_id !== ''" id="add-category"
                    required />

                <ion-text :class="state.category_id !== '' ? 'hide' : 'show'" v-if="v$.tag.$error" color="danger">{{
                    v$.tag.$errors[0].$message
                }}</ion-text>
            </ion-item>
        </template>

        <template #transactionDate>
            <ion-item class="form-item">
                <ion-label for="transaction-date" name="transaction-date" position="floating">Date
                </ion-label>

                <ion-input v-model.lazy="state.date" type="date" id="transaction-date" required slot="end" />

                <ion-text class="block" v-if="v$.date.$error" color="danger">{{
                    v$.date.$errors[0].$message
                }}</ion-text>
            </ion-item>
        </template>

        <template #inputDescription>
            <ion-item class="form-item">
                <ion-label for="transaction-description" name="transaction-description" position="floating">Ajouter une
                    description</ion-label>

                <ion-input v-model.lazy="state.description" id="transaction-description" type="text" required />

                <ion-text v-if="v$.description.$error" color="danger">{{
                    v$.description.$errors[0].$message
                }}</ion-text>
            </ion-item>
        </template>

        <template #inputAmount>
            <ion-item class="form-item">
                <ion-label for="transaction-amount" name="transaction-amount" position="floating">Indiquer le montant
                </ion-label>

                <ion-input v-model.lazy="state.amount" id="transaction-amount" type="number" required />

                <ion-text v-if="v$.amount.$error" color="danger">{{
                    v$.amount.$errors[0].$message
                }}</ion-text>
            </ion-item>
        </template>

        <template #addTransactionButton>
            <ion-button expand="full" @click.prevent="addTransaction()" size="large"
                class="call-to-action-btn space-between">Valider
            </ion-button>
        </template>

        <template #cancelTransactionButton>
            <ion-button expand="full" @click.prevent="closeModal()" size="large" class="call-to-action-btn" color="secondary">Annuler
            </ion-button>
        </template>

    </form-add-transaction>
</template>

<style scoped>

.form-item,
.space-between {
    margin-bottom: 3.5vh;
}

.hide {
    display: none;
}

.show {
    display: inline;
}
</style>