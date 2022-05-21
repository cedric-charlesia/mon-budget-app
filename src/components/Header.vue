<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps<{
  mainTitle: string;
  subTitle: string;
}>();
</script>

<template>
  <header class="header">
    <h1 class="main-title">
      <RouterLink to="/">{{ mainTitle }}</RouterLink>
    </h1>
    <h2 class="subtitle">{{ subTitle }}</h2>
  </header>
</template>

<style>
.header {
  height: 35%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.main-title {
  font-size: var(--main-title-size);
}
.main-title a,
.main-title a:active,
.main-title a:hover,
.main-title a:visited {
  text-decoration: none;
  color: var(--accent-color);
}
.subtitle {
  text-align: center;
  font-weight: normal;
}
</style>
