<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps<{
  mainTitle: string;
  subTitle: string;
}>();
</script>

<template>
  <h1 class="main-title">
    <RouterLink to="/">{{ mainTitle }}</RouterLink>
  </h1>
  <h2 class="subtitle">{{ subTitle }}</h2>
</template>

<style>
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
  margin-bottom: 4rem;
  text-align: center;
  font-weight: normal;
}
</style>
