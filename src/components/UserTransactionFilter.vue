<template>
    <div class="q-my-md q-mx-md" v-if="user.filterTransactions === true">
        <q-btn-dropdown color="primary" label="Filtrer">
            <q-list>
                <q-item clickable v-close-popup @click="filterByCategories">
                    <q-item-section>
                        <q-item-label>Par cat&eacute;gorie</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="filterByTypes">
                    <q-item-section>
                        <q-item-label>Par type</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'UserDateFilter',
    components: {},
});

const filterByCategories = () => {
    console.log('Par catégories')
};

const filterByTypes = () => {
    console.log('Par types')
};
</script>