<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header
    v-if="$route.name !== 'user'"
    mainTitle="Mon Budget"
    subTitle="L'application qui personnalise et gère mon budget en toute simplicité !"
  />

  <RouterView />

  <Footer copyright="Mon Budget ©2022" />
</template>
