<template>
    <q-header bordered>
        <q-toolbar>
            <q-toolbar-title>
                <q-btn flat no-caps class="q-pl-none text-h6 text-weight-regular" to="/user">Budget de {{ user.username
                }}</q-btn>
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
