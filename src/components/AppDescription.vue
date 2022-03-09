<script setup>
defineProps({
    description: {
        type: String,
        required: true
    }
})
</script>

<template>
    <h2 class="app_description">{{ description }}</h2>
</template>

<style>
.app_description {
    margin-bottom: 4rem;
    text-align: center;
    font-weight: normal;
}
</style>