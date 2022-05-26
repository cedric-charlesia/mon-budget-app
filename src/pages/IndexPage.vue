<template>
  <q-page>
    <h2 class="text-h5 text-center q-mx-lg q-my-lg">Pour suivre ses d&eacute;penses de mani&egrave;re
      personnalis&eacute;e et avec simplicit&eacute; !</h2>
    <HomePageForms />

    <!-- <q-card bordered square class="my-card q-my-xl q-mx-md absolute-bottom" v-if="deferredPrompt">
      <q-banner inline-actions rounded class="bg-white text-primary q-gutter-md">
        <q-icon size="md"><img src="../../mon-budget-logo.png" /></q-icon>

        <template v-slot:action>
          <q-btn flat label="Annuler" @click="deferredPrompt = false" />
          <q-btn color="primary" label="Installer" @onClick="promptInstall" />
        </template>
      </q-banner>
    </q-card> -->

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// let deferredPrompt: BeforeInstallPromptEvent | any = ref(true);

// const promptInstall = () => {
//   deferredPrompt.value.prompt();

//   deferredPrompt.value.userChoice.then((choiceResult: { outcome: string; }) => {
//     if (choiceResult.outcome === 'accepted') {
//       console.log('User accepted the install prompt');
//     } else {
//       console.log('User dismissed the install prompt');
//     }

//     deferredPrompt = null;
//     console.log(deferredPrompt);

//   });
// };

</script>
