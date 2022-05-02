<template>
    <q-btn color="primary" icon="add" class=" add-transaction">{{ title }}</q-btn>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
}>();
</script>