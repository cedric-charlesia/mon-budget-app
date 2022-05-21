<template>
    <q-dialog v-model="user.logOutModal" full-width>
        <q-card>
            <q-card-section>
                <div class="text-h6">
                    Je me d&eacute;connecte ?
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" v-close-popup />
                <q-btn label="Oui" color="negative" v-close-popup @click="logOut()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

import routes from '../../router';

import { userStore } from 'stores/userStore';

const user = userStore();

defineComponent({
    name: 'LogOutModal',
    components: {},
});

const logOut = () => {

    try {
        user.$reset;

        localStorage.removeItem('token');

        routes.push({
            path: '/',
        });
        ;
    } catch (error) {
        console.error(error)
    }
}

</script>