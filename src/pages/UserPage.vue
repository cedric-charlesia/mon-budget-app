<template>
  <q-page class="user-content">

    <UserTransactionsSumarry />

    <UserDateInput />

    <UserTransactionsList />

    <AddButton title="Ajouter une transaction" @click="user.addTransactionModal = true" />

    <AddTransactionModal />

  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import UserDateInput from 'components/UserDateInput.vue';
import UserTransactionsSumarry from 'components/UserTransactionsSumarry.vue';
import UserTransactionsList from 'components/UserTransactionsList.vue';

import AddButton from 'components/buttons/AddButton.vue';

import AddTransactionModal from 'components/modals/AddTransactionModal.vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
  name: 'UserPage',
  components: {},
});
</script>
