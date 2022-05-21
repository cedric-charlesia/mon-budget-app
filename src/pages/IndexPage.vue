<template>
  <q-page>
    <h2 class="text-h5 text-center q-mx-lg q-my-lg">Pour suivre ses d&eacute;penses de mani&egrave;re
      personnalis&eacute;e et avec simplicit&eacute; !</h2>
    <HomePageForms />

  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomePageForms from 'components/forms/HomePageForms.vue';

// import { BeforeInstallPromptEvent } from 'vue-pwa-install';

defineComponent({
  name: 'IndexPage',
  components: { HomePageForms },
});

</script>
