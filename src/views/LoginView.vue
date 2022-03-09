<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <LoginForm />
    <div class="login-register">
      <p>Pas encore inscrit ?</p>
      <RouterLink to="/">S'inscrire</RouterLink>
    </div>
  </main>
</template>
