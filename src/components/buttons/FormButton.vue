<template>
    <div class="q-pt-xs text-center">
        <q-btn type="button" color="secondary">{{ title }}</q-btn>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
}>();
</script>