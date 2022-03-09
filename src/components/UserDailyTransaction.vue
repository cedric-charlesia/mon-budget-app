<script setup lang="ts"></script>

<template>
  <section class="daily_transaction">
    <div class="daily_transaction_header">
      <p>12 Fév</p>
      <p>20 €</p>
      <p>2200 €</p>
    </div>

    <div class="daily_transaction_content">
      <p class="transaction_icon">N</p>
      <div class="transaction_details">
        <p>Nourriture</p>
        <div class="daily_transaction_total">
          <p>20 €</p>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  </section>
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
  gap: 0.5rem;
}

.daily_transaction_total input[type="checkbox"] {
  transform: scale(1.5);
}

.transaction_details {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 0.7rem;
}

.transaction_icon {
  padding: 0.5rem 0.6rem;
  margin: auto;
  border-radius: 50%;
  border: 2px solid var(--grey-color);
}
</style>
