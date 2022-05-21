<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat no-caps class="q-pl-none text-h6 text-weight-regular" to="/">Mon Budget</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="q-py-sm q-gutter-xs row justify-center">
      <q-btn flat no-caps class="q-px-sm q-ma-none text-weight-regular" to="/">Accueil</q-btn>
      <q-btn flat no-caps class="q-px-sm q-ma-none text-weight-regular" to="/legal">Mentions l&eacute;gales</q-btn>
      <q-btn flat no-caps class="q-px-sm q-ma-none text-weight-regular">&copy; 2022</q-btn>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'MainLayout',
});
</script>
