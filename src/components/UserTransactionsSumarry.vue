<template>
    <q-card square class="my-card q-my-md q-mx-md">
        <q-card-section class="bg-secondary text-white">
            <div class="text-h6 text-center"> Total : 1290.10 &euro;</div>
        </q-card-section>

        <q-card-actions align="around">
            <q-btn flat>Revenus : 2500 &euro;</q-btn>
            <q-btn flat>D&eacute;penses : 1209.90 &euro;</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
    name: 'UserTransactionsSumarry',
    components: {},
});

</script>