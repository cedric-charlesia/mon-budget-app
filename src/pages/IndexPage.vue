<template>
  <q-page>
    <h2 class="text-h5 text-center q-mx-lg q-my-lg">L'application personnalis&eacute;e pour suivre ses d&eacute;penses
      avec simplicit&eacute; !</h2>
    <HomePageForms />


    <q-card bordered square class="my-card q-my-xl q-mx-md absolute-bottom">
      <q-banner inline-actions rounded class="bg-white text-primary q-gutter-md">
        <q-icon size="md"><img src="../../mon-budget-logo.png" /></q-icon>

        <template v-slot:action>
          <q-btn flat label="Annuler" />
          <q-btn color="primary" label="Installer" />
        </template>
      </q-banner>
    </q-card>

  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomePageForms from 'components/forms/HomePageForms.vue';

defineComponent({
  name: 'IndexPage',
  components: { HomePageForms },
});
</script>
