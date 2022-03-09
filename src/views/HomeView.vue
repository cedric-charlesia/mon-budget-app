<script setup>
import AppTitle from '@/components/AppTitle.vue'
import AppDescription from '@/components/AppDescription.vue'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <AppTitle title="Mon Budget" />
  <AppDescription
    description="L'application qui personnalise et gère mon budget en toute simplicité !"
  />

  <RouterView />

  <AppFooter />
</template>