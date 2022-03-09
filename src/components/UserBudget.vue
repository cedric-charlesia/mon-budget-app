<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <h1>Hello, my name is {{ user.username }}</h1>
</template>
