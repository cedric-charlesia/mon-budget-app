<template>
  <q-layout view="lHh Lpr lFf">
    <UserHeader />

    <q-page-container style="padding-top: 51px; padding-bottom: 0;">
      <UserDetails />
    </q-page-container>

    <UserFooter />
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import UserHeader from '../components/UserHeader.vue';
import UserDetails from 'pages/UserDetails.vue';
import UserFooter from '../components/UserFooter.vue';

defineComponent({
  name: 'UserAccountDetails',
});

</script>
