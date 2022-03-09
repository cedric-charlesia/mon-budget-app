<script setup lang="ts"></script>

<template>
  <div class="transaction_button">
    <button type="submit">Ajouter une transaction</button>
  </div>
</template>

<style scoped>
.transaction_button {
  /* height: 25%; */
  align-self: center;
}

.transaction_button button {
  cursor: pointer;
  padding: 1rem;
  border: none;
  background-color: var(--accent-color);
  color: var(--text-white-color);
}
</style>
