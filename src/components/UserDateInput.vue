<template>
    <q-input filled v-model="date" mask="date" class="q-my-md q-mx-md">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
    name: 'UserDateInput',
    components: {},
});

const date = ref('2022/01/02');

</script>