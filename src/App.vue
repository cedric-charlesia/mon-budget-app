<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header
    mainTitle="Mon Budget"
    subTitle="L'application qui personnalise et gère mon budget en toute simplicité !"
  />

  <RouterView />

  <Footer legalMentions="Mentions Légales" copyright="Cédric CHARLESIA ©2022" />
</template>

<style>
@import "@/assets/normalize.css";
@import "@/assets/base.css";

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
