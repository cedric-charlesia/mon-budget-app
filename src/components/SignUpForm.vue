<script setup>
import Form from './Form.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <Form>
        <template #form>
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Mot de passe" />
            <button type="submit">S'inscrire</button>
        </template>
        <template #switch_form>
            <p>J'ai déjà un compte ?</p>
            <RouterLink to="/login">Se connecter</RouterLink>
        </template>
    </Form>
</template>