<script setup lang="ts">
defineProps<{
  copyright: string;
}>();
</script>

<template>
  <div class="footer">
    <p>{{ copyright }}</p>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
