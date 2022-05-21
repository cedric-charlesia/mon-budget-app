<script setup lang="ts">
import HomePageView from "@/views/HomePageView.vue";
</script>

<template>
  <HomePageView />
</template>

<style>
@import "@/assets/normalize.css";
@import "@/assets/base.css";

#app {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  #app {
    width: 20vw;
    margin: auto;
  }
}
</style>
