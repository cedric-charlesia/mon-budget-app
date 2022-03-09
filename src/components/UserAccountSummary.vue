<script setup lang="ts"></script>

<template>
  <section class="transaction_summary">
    <div>
      <p>Revenus</p>
      <p class="income">2200 €</p>
    </div>
    <div>
      <p>Dépenses</p>
      <p class="expense">70 €</p>
    </div>
    <div>
      <p>Total</p>
      <p class="transaction_total">2130 €</p>
    </div>
  </section>
</template>

<style scoped>
.transaction_summary {
  display: flex;
  justify-content: space-between;
}

.income {
  color: #2eb086;
  font-weight: bold;
}

.expense {
  color: #da1212;
  font-weight: bold;
}

.transaction_total {
  color: #000;
  font-weight: bold;
}
</style>
