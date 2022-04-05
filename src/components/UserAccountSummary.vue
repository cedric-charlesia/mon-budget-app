<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <div class="summary-container">
    <div class="summary">
      <p>Revenus</p>
      <p class="income">{{ user.getTotalIncomeOrExpense("revenu") }} &euro;</p>
    </div>
    <div class="summary">
      <p>Dépenses</p>
      <p class="expense">
        {{ user.getTotalIncomeOrExpense("dépense") }} &euro;
      </p>
    </div>
    <div class="summary">
      <p>Solde</p>
      <p class="transaction_total">
        {{
          user.getTotalIncomeOrExpense("revenu") -
          user.getTotalIncomeOrExpense("dépense")
        }}
        &euro;
      </p>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  justify-content: space-between;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.summary p {
  margin-top: 0;
  margin-bottom: 0;
}

.income {
  /* color: #2eb086; */
  color: #248f6d;
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
