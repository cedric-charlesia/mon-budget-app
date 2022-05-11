<template>
  <q-page>

    <UserDetailsSummary />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import UserDetailsSummary from 'components/UserDetailsSummary.vue';

defineComponent({
  name: 'UserDetails',
  components: {},
});
</script>
