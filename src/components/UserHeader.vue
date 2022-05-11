<template>
    <q-header bordered>
        <q-toolbar>
            <q-toolbar-title>
                Budget de {{ user.username }}
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'UserHeader',
});

</script>
