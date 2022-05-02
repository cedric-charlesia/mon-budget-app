<template>
  <q-page class="user-content">

    <UserDateInput />

    <UserTransactionsSumarry />

    <UserTransactionsList />

    <AddButton title="Ajouter une transaction" />

  </q-page>
</template>

<script setup lang="ts">
import UserDateInput from 'components/UserDateInput.vue';
import UserTransactionsSumarry from 'components/UserTransactionsSumarry.vue';
import UserTransactionsList from 'components/UserTransactionsList.vue';

import AddButton from 'components/buttons/AddButton.vue';

import { defineComponent } from 'vue';

defineComponent({
  name: 'UserPage',
  components: {},
});


</script>
