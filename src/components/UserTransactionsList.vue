<template>
    <q-list>
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

        <div v-else class="screen-size details">
            <div v-for="transactionDate of user.dates" :key="transactionDate">
                <q-item-label v-if="transactionDate.includes(user.selectedDate)" header
                    class="q-pb-none text-weight-bold">

                    {{ date.formatDate(transactionDate, 'DD MMM YYYY', {
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
                    <div v-for="category of user.categories" :key="category.id">
                        <q-card
                            v-if="(transaction.date.includes(user.selectedDate)) && (transaction.date === transactionDate) && (transaction.category_id === category.id)"
                            square class="my-card q-my-sm q-mx-md">

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

                                    <q-item-label v-if="category.type === 'dépense'" lines="1"
                                        class=" text-body2 text-weight-bold text-negative">
                                        {{ transaction.amount }} &euro;
                                    </q-item-label>

                                    <q-item-label v-else lines="1" class=" text-body2 text-weight-bold text-positive">
                                        {{ transaction.amount }} &euro;
                                    </q-item-label>

                                </q-item-section>

                                <q-item-section side>
                                    <div class="text-grey-8 q-gutter-xs">
                                        <q-btn flat dense round icon="edit" @click="user.editTransactionModal = true" />
                                        <q-btn flat dense round icon="delete"
                                            @click="user.deleteTransactionModal = true" />
                                        <q-checkbox v-model="check1" />
                                    </div>
                                </q-item-section>

                            </q-item>
                        </q-card>
                    </div>
                </div>

                <EditTransactionModal />
                <DeleteTransactionModal />
            </div>
        </div>

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

const check1 = ref(false);

</script>

<style scoped lang="scss">
.user-content {
    position: relative;
}

.user-content .details {
    overflow-y: auto;
}
</style>