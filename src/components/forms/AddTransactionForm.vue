<template>
    <q-form class="q-pa-md q-gutter-md">
        <q-select dense :options="transactionType" option-label="label" option-value="value" filled v-model.lazy="type"
            emit-value map-options label="Type de transaction" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez choisir un type de transaction']" />

        <q-select dense :options="transactionCategory" option-label="label" option-value="value" filled
            v-model.lazy="category" emit-value map-options label="Sélectionner la catégorie" lazy-rules
            :rules="[val => val && val > 0 || 'Veuillez sélectionner une catégorie ou en créer une ci-dessous']"
            :disable="tag !== ''" />

        <q-input dense type="text" filled v-model.lazy="tag" :disable="Number(category) !== 0"
            placeholder="Créer une catégorie" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez créer une catégorie ou en sélectionner une ci-dessus']" />

        <q-input dense type="date" filled v-model.lazy="transactionDate" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez indiquer une date']" />

        <q-input dense type="text" filled v-model.lazy="description" placeholder="Ajouter une description" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez ajouter une description']" />

        <q-input dense type="number" filled v-model.lazy="amount" placeholder="Indiquer le montant" lazy-rules
            :rules="[val => val && val.length > 0 || 'Veuillez indiquer un montant']" />

        <div align="right" v-if="validForm">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup="validForm" @click.prevent="addTransaction" />
        </div>
        <div align="right" v-else>
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup="validForm" @click.prevent="addTransaction" />
        </div>

    </q-form>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

import { date, useQuasar } from 'quasar';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'AddTransactionForm',
});

const $q = useQuasar();

const validForm = ref(true);

const type = ref('');
const transactionType = [{ label: 'Revenu', value: 'revenu' }, { label: 'Dépense', value: 'dépense' }];

const tag = ref('');
const transactionCategory = user.transactionCategories;

const category = ref('');
const transactionDate = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'));
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

    if (type.value === '' || (String(category.value) === '0' && tag.value === '') || transactionDate.value === '' || description.value === '' || amount.value === '') {
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
        categoryInput.type = type.value;
        categoryInput.tag = tag.value;

        transactionInput.category_id = Number(category.value);
        transactionInput.date = transactionDate.value;
        transactionInput.description = description.value;
        transactionInput.amount = Number(amount.value);
        transactionInput.check = 'false';

        await user.addTransaction(categoryInput, transactionInput);

    } catch (error) {
        console.error(error)
    }
}
</script>