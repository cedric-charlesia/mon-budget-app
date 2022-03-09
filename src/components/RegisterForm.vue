<script setup lang="ts">
import FormItem from "./FormItem.vue";
</script>

<template>
  <FormItem>
    <template #inputText>
      <input type="text" placeholder="Prénom" />
      <input type="text" placeholder="Email" />
    </template>
    <template #inputPassword>
      <input type="password" placeholder="Mot de passe" />
    </template>
    <template #formButton>
      <button>S'inscrire</button>
    </template>
  </FormItem>
</template>
