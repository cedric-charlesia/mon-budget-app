<template>
  <q-page>
    <q-card square class="my-card q-my-md q-mx-md">
      <q-card-section class="q-py-sm justify-center bg-secondary text-white" horizontal>
        <div class="text-h6">
          Mes cat&eacute;gories
        </div>
      </q-card-section>
    </q-card>

    <q-card square class="my-card q-my-xs q-mx-md" v-for="category of user.categories" :key="category.id">

      <q-item>

        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ category.tag.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>

          <q-item-label class="text-capitalize text-subtitle1">
            {{ category.tag }}
          </q-item-label>

        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8">
            <q-btn flat dense round icon="edit" @click="user.showCategoryDetails(category.id)" />

            <q-btn flat dense round icon="delete" @click="deleteCategory(category.id)" />

          </div>
        </q-item-section>

      </q-item>

    </q-card>

    <EditCategoryModal />
    <DeleteCategoryModal />

  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import EditCategoryModal from 'components/modals/EditCategoryModal.vue';
import DeleteCategoryModal from 'components/modals/DeleteCategoryModal.vue';

import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
  name: 'UserCategoriesDetails',
  components: {},
});

const deleteCategory = async (catId: number) => {
  user.deleteCategoryId = 0;

  try {
    user.deleteCategoryId = Number(catId);

    user.deleteCategoryModal = true;

  } catch (error) {
    console.error(error);
  }
};
</script>
