<template>
    <q-form class="q-pa-md q-gutter-md">
        <q-input type="date" filled v-model="date" placeholder="03 mai 20222" lazy-rules />
        <q-input type="text" filled v-model="description" placeholder="Courses chez Carrefour" lazy-rules />
        <q-input type="number" filled v-model="amount" placeholder="34.90 &euro;" lazy-rules />
        <q-input type="text" filled v-model="category" placeholder="Courses" lazy-rules />
        <q-input type="text" filled v-model="type" placeholder="Dépense" lazy-rules />

        <div align="right">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup @click="updateTransaction" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
    name: 'EditTransactionForm',
});

const date = ref('');
const description = ref('');
const amount = ref('');
const category = ref('');
const type = ref('');

let transactionInput = {
    date: '',
    description: '',
    amount: '',
    category: '',
    type: '',
}

const updateTransaction = async () => {

    try {
        transactionInput.date = date.value;
        transactionInput.description = description.value;
        transactionInput.amount = amount.value;
        transactionInput.category = category.value;
        transactionInput.type = type.value;

        console.log(transactionInput);
    } catch (error) {
        console.error(error)
    }
}
</script>