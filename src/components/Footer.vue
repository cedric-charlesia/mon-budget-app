<script setup lang="ts">
defineProps<{
  legalMentions: string;
  copyright: string;
}>();
</script>

<template>
  <div class="footer">
    <p>{{ legalMentions }}</p>
    <p>{{ copyright }}</p>
  </div>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}
</style>
