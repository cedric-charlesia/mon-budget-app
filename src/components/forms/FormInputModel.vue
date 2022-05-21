<template>
    <q-form class="q-mx-lg q-gutter-sm">
        <slot name="inputTextOrEmail">
            <q-input v-model="input" placeholder="">
                <template v-slot:prepend>
                    <q-icon />
                </template>
            </q-input>
        </slot>

        <slot name="inputPassword">
            <q-input v-model="input" placeholder="">
                <template v-slot:prepend>
                    <q-icon />
                </template>
            </q-input>
        </slot>

        <slot name="formButton">
            <q-btn type="button" color="secondary"></q-btn>
        </slot>

    </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref(null);

</script>