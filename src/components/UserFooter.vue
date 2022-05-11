<template>
    <q-footer bordered>
        <q-toolbar class="user-footer">
            <q-tabs v-model="tab" class="text-white" narrow-indicator>
                <q-route-tab to="/user/:id" exact name="acceuil" icon="home" label="Accueil" />
                <q-route-tab to="/" exact name="catégories" icon="edit" label="Cat&eacute;gories" />
                <q-route-tab to="/" exact name="Stats" icon="show_chart" label="Stats" />
                <q-route-tab to="/account" exact name="compte" icon="account_circle" label="Compte" />
            </q-tabs>
        </q-toolbar>
    </q-footer>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
    name: 'UserFooter',
});

const tab = ref('acceuil');
</script>

<style scoped lang="scss">
.user-footer {
    justify-content: center;
}
</style>