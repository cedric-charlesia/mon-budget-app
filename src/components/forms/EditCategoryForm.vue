<template>
    <q-form class="q-pa-md q-gutter-md">
        <q-select dense :options="categories" option-label="label" option-value="value" filled v-model.lazy="type"
            emit-value map-options label="Type de transaction" lazy-rules />

        <q-select dense :options="transactionCategory" option-label="label" option-value="tag" filled
            v-model.lazy="category" emit-value map-options label="Sélectionner la catégorie" lazy-rules
            :disable="tag !== ''" />

        <q-input dense type="text" filled v-model.lazy="tag" placeholder="Nouvelle catégorie" lazy-rules />


        <div align="right">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn label="Valider" color="positive" v-close-popup @click="editCategory" />
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

const type = ref(user.category.type);
const categories = [{ label: 'Revenu', value: 'revenu' }, { label: 'Dépense', value: 'dépense' }];

const tag = ref('');
const transactionCategory = user.transactionCategories;

const category = ref(user.category.tag);

let categoryInput = {
    id: NaN,
    type: '',
    tag: '',
    user_id: user.id,
}

const editCategory = async () => {

    try {
        categoryInput.id = user.category.id;
        categoryInput.tag = user.category.tag;
        categoryInput.type = type.value;

        if (tag.value !== '') {
            categoryInput.tag = tag.value;
        }
        else {
            categoryInput.tag = category.value
        };

        categoryInput.type = type.value;

        await user.updateCategory(categoryInput.tag, categoryInput.type, categoryInput.id);


    } catch (error) {
        console.error(error)
    }
}
</script>