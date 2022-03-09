<<<<<<< HEAD
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
=======
<script setup>
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <HomeView />

</template>

<style>
@import "./assets/normalize.css";
@import "./assets/base.css";
>>>>>>> 801bb4587fc6839701b3651fccbfb206a2ff24e1

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
