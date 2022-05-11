<template>
    <q-dialog v-model="user.editCategoryModal" full-width>
        <q-card>
            <q-card-section>
                <div class="text-h6">
                    Modifier cette cat&eacute;gorie
                </div>
            </q-card-section>

            <q-card-section>
                <EditCategoryForm />
            </q-card-section>

        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import EditCategoryForm from '../forms/EditCategoryForm.vue';

import { userStore } from 'stores/userStore';

const user = userStore();

defineComponent({
    name: 'EditCategoryModal',
    components: {},
});

</script>