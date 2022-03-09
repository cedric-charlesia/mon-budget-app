<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <h1>Hello!</h1>
  <p>Hello, my name is {{ user.username }}</p>
</template>
