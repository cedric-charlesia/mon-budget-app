<template>
    <q-card square class="my-card q-my-md q-mx-md">
        <q-card-section class="q-py-sm justify-center bg-secondary text-white" horizontal>
            <div class="text-h6">
                <p> Mes informations </p>
            </div>
        </q-card-section>

        <q-card-section>
            <q-card flat class="my-card q-my-sm">

                <q-item class="q-my-sm">

                    <q-item-section avatar>
                        <q-icon name="account_circle" color="primary" size="md" />
                    </q-item-section>

                    <q-item-section>

                        <q-item-label class="text-capitalize text-subtitle1">
                            {{ user.username }}
                        </q-item-label>

                    </q-item-section>


                </q-item>

                <q-item class="q-my-sm">

                    <q-item-section avatar>
                        <q-icon name="email" color="primary" size="md" />
                    </q-item-section>

                    <q-item-section>

                        <q-item-label class="text-subtitle1">
                            {{ user.email }}
                        </q-item-label>

                    </q-item-section>

                </q-item>

            </q-card>
        </q-card-section>

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