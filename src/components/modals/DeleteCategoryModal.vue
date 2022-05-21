<template>
    <q-dialog v-model="user.deleteCategoryModal" full-width>
        <q-card>
            <q-card-section>
                <div class="text-h6">
                    Supprimer cette cat&eacute;gorie ?
                </div>
                <div class="text-negative text-weight-bold q-my-sm">
                    <q-icon name="warning" color="negative" size="sm" />
                    Les transactions de la catégorie seront
                    supprim&eacute;es
                </div>

            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" v-close-popup />
                <q-btn label="Supprimer" color="negative" v-close-popup @click="deleteCategory" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import { userStore } from 'stores/userStore';

const user = userStore();

defineComponent({
    name: 'DeleteCategoryModal',
    components: {},
});

const deleteCategory = async () => {

    const categoryId = Number(user.deleteCategoryId);

    try {
        await user.deleteCategory(categoryId);
    } catch (error) {
        console.error(error)
    }
}
</script>