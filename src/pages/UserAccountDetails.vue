<template>
  <q-card square class="my-card q-my-md q-mx-md">
    <q-card-section class="q-py-sm justify-center bg-secondary text-white" horizontal>
      <div class="text-h6">
        Mes informations
      </div>
    </q-card-section>

    <q-card-section>
      <q-card flat class="my-card q-my-sm">

        <q-item class="q-my-sm">

          <q-item-section avatar>
            <q-icon name="account_circle" color="primary" size="md" />
          </q-item-section>

          <q-item-section>

            <q-item-label class="text-capitalize text-subtitle1">
              {{ user.username }}
            </q-item-label>

          </q-item-section>

        </q-item>

        <q-item class="q-my-sm">

          <q-item-section avatar>
            <q-icon name="email" color="primary" size="md" />
          </q-item-section>

          <q-item-section>

            <q-item-label class="text-subtitle1">
              {{ user.email }}
            </q-item-label>

          </q-item-section>

        </q-item>

        <q-item class="q-my-sm">

          <q-item-section avatar>
            <q-icon name="logout" color="primary" size="md" />
          </q-item-section>

          <q-item-section>

            <q-item-label class="text-subtitle1">
              <q-btn flat class="q-pa-none text-subtitle1" color="negative" no-caps @click="logOutUser()">
                D&eacute;connexion
              </q-btn>
            </q-item-label>

          </q-item-section>

        </q-item>

      </q-card>
    </q-card-section>

  </q-card>

  <LogOutModal />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import LogOutModal from 'components/modals/LogOutModal.vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
  name: 'UserAccountDetails',
  components: {},
});

const logOutUser = async () => {

  try {
    user.logOutModal = true;
  } catch (error) {
    console.error(error);
  }
};
</script>
