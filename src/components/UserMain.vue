<script setup lang="ts">
// import UserCalendar from "@/components/UserCalendar.vue";
// import UserAccountSummary from "@/components/UserAccountSummary.vue";
import UserDailyTransaction from "@/components/UserDailyTransaction.vue";
import UserTransactionModal from "@/components/UserTransactionModal.vue";
</script>

<template>
  <main>
    <div class="main_content">
      <!-- <UserCalendar /> -->
      <!-- <UserAccountSummary /> -->
      <div class="transactions">
        <UserDailyTransaction />
      </div>
      <UserTransactionModal />
    </div>
  </main>
</template>

<style scoped>
.main_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 65vh;
}

.transactions {
  overflow-y: auto;
  padding: 0.25rem;
  padding-top: 0.25rem;
}
</style>
