<template>
    <q-list>

        <div class="screen-size details">
            <q-item-label header class="q-pb-none text-weight-bold">03 Mai 2022</q-item-label>
            <q-card square class="my-card q-my-sm q-mx-md">
                <q-item class="q-my-sm">
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            C
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Courses chez Carrefour</q-item-label>
                        <q-item-label caption lines="1" class="text-weight-bold text-negative">34.90 &euro;
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn flat dense round icon="edit" @click="user.editTransaction = true" />
                            <q-btn flat dense round icon="delete" @click="user.deleteTransaction = true" />
                            <q-checkbox v-model="check1" />
                        </div>
                    </q-item-section>
                </q-item>
            </q-card>

            <EditTransactionModal />
            <DeleteTransactionModal />

            <q-card square class="my-card q-my-sm q-mx-md">
                <q-item class="q-my-sm">
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            R
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Remboursement pr&ecirc;t</q-item-label>
                        <q-item-label caption lines="1" class="text-weight-bold text-negative">
                            1150 &euro;</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn flat dense round icon="edit" />
                            <q-btn flat dense round icon="delete" />
                            <q-checkbox v-model="check2" />
                        </div>
                    </q-item-section>
                </q-item>
            </q-card>

            <q-item-label header class="q-pb-none text-weight-bold">02 Mai 2022</q-item-label>
            <q-card square class="my-card q-my-sm q-mx-md">
                <q-item class="q-my-sm">
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            E
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Essence</q-item-label>
                        <q-item-label caption lines="1" class="text-weight-bold text-negative">25 &euro;</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn flat dense round icon="edit" />
                            <q-btn flat dense round icon="delete" />
                            <q-checkbox v-model="check3" />
                        </div>
                    </q-item-section>
                </q-item>
            </q-card>

            <q-item-label header class="q-pb-none text-weight-bold">25 Avril 2022</q-item-label>
            <q-card square class="my-card q-my-sm q-mx-md">
                <q-item class="q-my-sm">
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            S
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>Salaire de Mai</q-item-label>
                        <q-item-label caption lines="1" class="text-weight-bold text-positive">2500 &euro;
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn flat dense round icon="edit" />
                            <q-btn flat dense round icon="delete" />
                            <q-checkbox v-model="check4" />
                        </div>
                    </q-item-section>
                </q-item>
            </q-card>
        </div>

    </q-list>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import EditTransactionModal from 'components/modals/EditTransactionModal.vue';
import DeleteTransactionModal from 'components/modals/DeleteTransactionModal.vue';

import { userStore } from 'stores/userStore';

const user = userStore();

defineComponent({
    name: 'UserTransactionsList',
    components: {},
});

const check1 = ref(false);
const check2 = ref(false);
const check3 = ref(false);
const check4 = ref(false);

</script>

<style scoped lang="scss">
.user-content {
    position: relative;
}

.user-content .details {
    overflow-y: auto;
}
</style>