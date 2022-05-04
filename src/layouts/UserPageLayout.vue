<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          Budget de {{ user.username }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container style="padding-top: 51px; padding-bottom: 0;">
      <UserPage />
    </q-page-container>

    <q-footer bordered>
      <q-toolbar class="user-footer">
        <q-tabs v-model="tab" class="text-white" narrow-indicator>
          <q-route-tab to="/" exact name="catégories" icon="edit" label="Cat&eacute;gories" />
          <q-route-tab to="/" exact name="Stats" icon="show_chart" label="Stats" />
          <q-route-tab to="/" exact name="compte" icon="account_circle" label="Compte" />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import UserPage from '../pages/UserPage.vue'

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
  name: 'UserLayout',
});

const tab = ref('compte')
</script>

<style scoped lang="scss">
.user-footer {
  justify-content: center;
}
</style>
