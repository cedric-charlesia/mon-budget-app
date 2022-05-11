<template>
  <q-page>
    <q-card square class="my-card q-my-md q-mx-md">
      <q-card-section class="q-py-sm justify-center bg-secondary text-white" horizontal>
        <div class="text-h6">
          Mes statistiques
        </div>
      </q-card-section>
    </q-card>

    <q-card square class="my-card q-my-sm q-mx-md q-my-lg">
      <q-item class="q-my-sm">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            C
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Cette fonctionnalit&eacute; n'est pas encore disponible
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>

  </q-page>
</template>


<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'UserStatsDetails',
  components: {},
});
</script>
