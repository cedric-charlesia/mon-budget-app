<template>
    <q-form class="q-pa-md q-gutter-md">
        <q-select :options="transactionType" filled v-model="type" label="Type de transaction" lazy-rules />
        <q-select :options="transactionCategory" filled v-model="category" label="Sélectionner la catégorie"
            lazy-rules />
        <q-input type="text" filled v-model="newCategory" placeholder="Créer une catégorie" lazy-rules />
        <q-input type="date" filled v-model="date" lazy-rules />
        <q-input type="text" filled v-model="description" placeholder="Ajouter une description" lazy-rules />
        <q-input type="number" filled v-model="amount" placeholder="Indiquer le montant" lazy-rules />

        <div align="right">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup @click="addTransactionModal" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
    name: 'AddTransactionForm',
});

const type = ref('');
const transactionType = ['Revenu', 'Dépense'];

const category = ref('');
const transactionCategory = ['Courses', 'Epargne', 'Jardin', 'Maison', 'Salaire'];

const newCategory = ref('');
const date = ref('');
const description = ref('');
const amount = ref('');


let transactionInput = {
    type: '',
    category: '',
    newCategory: '',
    date: '',
    description: '',
    amount: '',
}

const addTransactionModal = async () => {

    try {
        transactionInput.type = type.value;
        transactionInput.category = category.value;
        transactionInput.newCategory = newCategory.value;
        transactionInput.date = date.value;
        transactionInput.description = description.value;
        transactionInput.amount = amount.value;
        transactionInput.type = type.value;

        console.log(transactionInput);
    } catch (error) {
        console.error(error)
    }
}
</script>