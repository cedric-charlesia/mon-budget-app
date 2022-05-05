<template>
    <q-form class="q-pa-md q-gutter-md">
        <q-select dense :options="transactionType" option-label="label" option-value="value" filled v-model.lazy="type"
            emit-value map-options label="Type de transaction" lazy-rules />

        <q-select dense :options="transactionCategory" option-label="label" option-value="value" filled
            v-model.lazy="category" emit-value map-options label="Sélectionner la catégorie" lazy-rules
            :disable="tag !== ''" />

        <q-input dense type="text" filled v-model.lazy="tag" :disable="category !== 0" placeholder="Créer une catégorie"
            lazy-rules />

        <q-input dense type="date" filled v-model.lazy="date" lazy-rules />

        <q-input dense type="text" filled v-model.lazy="description" placeholder="Ajouter une description" lazy-rules />

        <q-input dense type="number" filled v-model.lazy="amount" placeholder="Indiquer le montant" lazy-rules />

        <div align="right">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup @click="addTransaction" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'AddTransactionForm',
});

const type = ref('');
const transactionType = [{ label: 'Revenu', value: 'revenu' }, { label: 'Dépense', value: 'dépense' }];

const tag = ref('');
const transactionCategory = user.transactionCategories;

const category = ref('');
const date = ref('');
const description = ref('');
const amount = ref('');

let categoryInput = {
    type: '',
    tag: '',
    user_id: user.id,
}

let transactionInput = {
    category_id: NaN,
    date: '',
    description: '',
    amount: NaN,
    check: '',
}

const addTransaction = async () => {

    try {
        categoryInput.type = type.value;
        categoryInput.tag = tag.value;

        transactionInput.category_id = Number(category.value);
        transactionInput.date = date.value;
        transactionInput.description = description.value;
        transactionInput.amount = Number(amount.value);
        transactionInput.check = 'false';

        user.addTransaction(categoryInput, transactionInput);

    } catch (error) {
        console.error(error)
    }
}
</script>