<script setup lang="ts">
import RegisterForm from "@/components/RegisterForm.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <RegisterForm />
    <div class="login-register">
      <p>J'ai déjà un compte ?</p>
      <RouterLink to="/login">Se connecter</RouterLink>
    </div>
  </main>
</template>

<style>
.login-register {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-register a,
.login-register a:active,
.login-register a:hover,
.login-register a:visited {
  text-decoration: none;
  color: var(--accent-color);
  font-weight: bold;
}
</style>
