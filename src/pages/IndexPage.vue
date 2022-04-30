<template>
  <q-page>
    <h2 class="text-h5 text-center q-mx-lg q-my-lg">L'application personnalis&eacute;e pour suivre ses d&eacute;penses
      avec simplicit&eacute; !</h2>
    <HomePageForms />
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
