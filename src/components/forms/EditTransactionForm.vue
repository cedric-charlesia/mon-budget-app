<template>
    <q-form class="q-pa-md q-gutter-md">
        <q-select dense :options="transactionType" option-label="label" option-value="value" filled v-model.lazy="type"
            emit-value map-options label="Type de transaction" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez choisir un type de transaction']" />

        <q-select dense :options="transactionCategory" option-label="label" option-value="value" filled
            v-model.lazy="category" emit-value map-options label="Sélectionner la catégorie" lazy-rules
            :rules="[val => val && val > 0 || 'Veuillez sélectionner une catégorie']" />

        <q-input type="text" class="text-capitalize" filled v-model="description" label="Description" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez ajouter une description']" />

        <q-input type="date" filled v-model="transactionDate" label="Date" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez indiquer une date']" />

        <q-input type="number" filled v-model="amount" label="Montant" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez indiquer un montant']" />

        <div align="right" v-if="validForm">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup="validForm" @click="editTransaction" />
        </div>

        <div align="right" v-else>
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup="validForm" @click="editTransaction" />
        </div>

    </q-form>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

import { date, useQuasar } from 'quasar';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'EditTransactionForm',
});

const $q = useQuasar();

const validForm = ref(true);

const transactionType = [{ label: 'Revenu', value: 'revenu' }, { label: 'Dépense', value: 'dépense' }];

const transactionCategory = user.transactionCategories;

const transactionDate = ref(date.formatDate(user.transaction.date, 'YYYY-MM-DD'));
const description = ref(user.transaction.description);
const amount = ref(user.transaction.amount);
const category = ref(user.category.id);
const type = ref(user.category.type);

let categoryInput = {
    id: NaN,
    tag: '',
    type: '',
}

let transactionInput = {
    id: NaN,
    date: '',
    description: '',
    amount: NaN,
    category_id: NaN,
    check: 'false',
}

const editTransaction = async () => {

    if (type.value === '' || String(category.value) === '0' || description.value === '' || transactionDate.value === '' || String(amount.value) === '') {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Veuillez remplir tous les champs',
            position: 'top',
            timeout: 2500,
        });
        validForm.value = false;

        return;
    }

    try {
        categoryInput.id = Number(category.value);
        categoryInput.tag = user.category.tag;
        categoryInput.type = type.value;

        transactionInput.id = Number(user.transaction.id);
        transactionInput.date = transactionDate.value;
        transactionInput.description = description.value;
        transactionInput.amount = Number(amount.value);
        transactionInput.category_id = Number(category.value);
        transactionInput.check = user.transaction.check;

        await user.updateCategory(categoryInput.tag, categoryInput.type, categoryInput.id);

        await user.updateTransaction(transactionInput.date, transactionInput.description, transactionInput.amount, transactionInput.category_id, transactionInput.id, transactionInput.check);
    } catch (error) {
        console.error(error)
    }
}
</script>