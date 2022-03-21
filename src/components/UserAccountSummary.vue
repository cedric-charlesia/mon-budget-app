<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <div class="transaction_summary">
    <div>
      <p>Revenus</p>
      <p class="income">{{ user.getTotalIncomeOrExpense("revenu") }} &euro;</p>
    </div>
    <div>
      <p>Dépenses</p>
      <p class="expense">
        {{ user.getTotalIncomeOrExpense("dépense") }} &euro;
      </p>
    </div>
    <div>
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
.transaction_summary {
  display: flex;
  justify-content: space-between;
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
