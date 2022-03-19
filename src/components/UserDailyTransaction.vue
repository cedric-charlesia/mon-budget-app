<script setup lang="ts">
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();
</script>

<template>
  <div class="daily_transaction" v-for="date of user.dates" :key="date">
    <div class="daily_transaction_header">
      <p>{{ user.showTransactionDate(date) }}</p>
      <!-- <p>20 €</p>
      <p>2200 €</p> -->
    </div>

    <div v-for="transaction of user.transactions" :key="transaction.id">
      <div class="daily_transaction_content" v-if="transaction.date === date">
        <p class="transaction_icon">
          {{ transaction.description.charAt(0).toUpperCase() }}
        </p>
        <div class="transaction_details">
          <p>
            {{ transaction.description }}
          </p>
          <div class="daily_transaction_total">
            <p>{{ transaction.amount }} &euro;</p>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily_transaction_header,
.daily_transaction_content,
.daily_transaction_total {
  display: flex;
  justify-content: space-between;
}

.daily_transaction_header p {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.daily_transaction_content {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid var(--grey-color);
}

.daily_transaction_total {
  align-items: center;
  gap: 0.7rem;
}

.daily_transaction_total input[type="checkbox"] {
  transform: scale(1.5);
  margin-right: 0.5rem;
}

.transaction_details {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 0.7rem;
  text-transform: capitalize;
}

.transaction_icon {
  padding: 0.5rem 0.6rem;
  margin: auto;
  border-radius: 50%;
  border: 2px solid var(--grey-color);
}
</style>
