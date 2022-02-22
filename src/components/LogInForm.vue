<script setup>
import Form from './Form.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <Form>
        <template #form>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </template>
        <template #switch_form>
            <p>Pas encore inscrit ?</p>
            <RouterLink to="/">S'inscrire</RouterLink>
        </template>
    </Form>
</template>