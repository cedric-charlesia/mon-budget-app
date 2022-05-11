<template>
    <q-list class="screen-size overflow">
        <div v-if="user.noTransaction === false">
            <q-card square class="my-card q-my-sm q-mx-md">
                <q-item class="q-my-sm">
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            P
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>
                            Pas encore de transaction enregistr&eacute;es &agrave; cette date
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card>
        </div>

        <div v-else v-for="transactionDate of user.dates" :key="transactionDate">

            <q-item-label v-if="(transactionDate.includes(user.selectedDate))" header
                class="q-pb-none text-weight-bold">

                {{ date.formatDate(transactionDate, 'D MMMM YYYY', {
                        days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                        daysShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
                        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
                            'Octobre', 'Novembre', 'Décembre'],
                        monthsShort: ['Jan', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.',
                            'Nov.',
                            'Déc.']
                    })
                }}

            </q-item-label>

            <div v-for="transaction of user.transactions" :key="transaction.id">

                <q-card
                    v-if="(date.formatDate(transaction.date, 'YYYY-MM-DD').includes(user.selectedDate)) && (date.formatDate(transaction.date, 'YYYY-MM-DD') === transactionDate)"
                    square class="my-card q-my-sm q-mx-md"
                    :class="transaction.check === 'true' ? 'checked-transaction' : ''">

                    <q-item class="q-my-sm">

                        <q-item-section avatar>
                            <q-avatar color="primary" text-color="white">
                                {{ transaction.description.charAt(0).toUpperCase() }}
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>

                            <q-item-label class="text-capitalize">
                                {{ transaction.description }}
                            </q-item-label>

                            <q-item-label v-if="transaction.type === 'dépense'" lines="1"
                                class=" text-body2 text-weight-bold text-negative">
                                {{ transaction.amount }} &euro;
                            </q-item-label>

                            <q-item-label v-else lines="1" class=" text-body2 text-weight-bold text-positive">
                                {{ transaction.amount }} &euro;
                            </q-item-label>

                        </q-item-section>

                        <q-item-section side>
                            <div class="text-grey-8">
                                <q-btn flat dense round icon="edit"
                                    @click="user.showTransactionDetails(transaction.category_id, transaction.id)" />

                                <q-btn flat dense round icon="delete"
                                    @click="deleteTransaction(transaction.category_id, transaction.id)" />

                                <q-checkbox v-model="checkbox" :val="String(transaction.id)"
                                    @click="updateCheckedTransaction(String(transaction.id), transaction.date, transaction.description, transaction.amount, transaction.category_id)" />
                            </div>
                        </q-item-section>

                    </q-item>
                </q-card>

                <q-card v-else class="hide"></q-card>
            </div>

        </div>

        <EditTransactionModal />
        <DeleteTransactionModal />


    </q-list>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { date } from 'quasar';

import EditTransactionModal from 'components/modals/EditTransactionModal.vue';
import DeleteTransactionModal from 'components/modals/DeleteTransactionModal.vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'UserTransactionsList',
    components: {},
});

const checkbox = ref(user.checkedTransactions);

const deleteTransaction = async (catId: number, transacId: number) => {
    user.deleteTransactionId = { catId: 0, transacId: 0 };

    try {
        user.deleteTransactionId.catId = Number(catId);
        user.deleteTransactionId.transacId = Number(transacId);

        user.deleteTransactionModal = true;
    } catch (error) {
        console.error(error);
    }
};

const updateCheckedTransaction = async (id: string, transactionDate: string, transactionDescription: string, transactionAmount: number, transactionCategory_id: number) => {

    const checkedCheckbox = user.checked = !user.checked;

    let checkedTransaction = {
        date: date.formatDate(transactionDate, 'YYYY-MM-DD'),
        description: transactionDescription,
        amount: transactionAmount,
        category_id: transactionCategory_id,
        check: String(checkedCheckbox),
    }
    try {
        user.updateTransaction(checkedTransaction.date, checkedTransaction.description, checkedTransaction.amount, checkedTransaction.category_id, Number(id), checkedTransaction.check);

    } catch (error) {
        console.error(error);
    }
};

</script>

<style scoped lang="scss">
.hide {
    display: none;
}

.checked-transaction {
    background-color: $grey;
}
</style>