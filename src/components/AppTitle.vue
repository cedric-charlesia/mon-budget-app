<script setup>
import { RouterLink } from 'vue-router'
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <h1 class="app_title"><RouterLink to="/">{{ title }}</RouterLink></h1>
</template>

<style>
.app_title {
    font-size: var(--main-title-size);
}
.app_title a,
.app_title a:hover,
.app_title a:active,
.app_title a:visited {
    text-decoration: none;
    color: var(--accent-color);
}
</style>