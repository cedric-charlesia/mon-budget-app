<template>
  <q-layout view="lHh Lpr lFf" class="desktop-layout">
    <UserHeader />

    <q-page-container style="padding-top: 51px; padding-bottom: 0;">
      <UserAccountDetails />
    </q-page-container>

    <UserFooter />
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import UserHeader from '../components/UserHeader.vue';
import UserAccountDetails from 'pages/UserAccountDetails.vue';
import UserFooter from '../components/UserFooter.vue';

defineComponent({
  name: 'UserAccount',
});

</script>
