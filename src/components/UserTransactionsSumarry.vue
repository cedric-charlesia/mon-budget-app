<template>
    <q-card square class="my-card q-my-md q-mx-md">
        <q-card-section class="q-py-sm justify-center bg-secondary text-white" horizontal>
            <div class="text-h6"> Total : {{ user.transactionSummary.total.toFixed(2) }} &euro;</div>
        </q-card-section>

        <q-card-actions align="around">
            <q-btn text-color="positive" flat>
                <span class="text-black q-pr-xs">Revenus :</span>
                {{ user.transactionSummary.income.toFixed(2) }} &euro;
            </q-btn>

            <q-separator vertical size="0.15rem" color="primary" class="separator" />
            <q-btn text-color="negative" flat>
                <span class="text-black q-pr-xs">D&eacute;penses :</span>
                {{ user.transactionSummary.expense.toFixed(2) }} &euro;
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'UserTransactionsSumarry',
    components: {},
});

</script>