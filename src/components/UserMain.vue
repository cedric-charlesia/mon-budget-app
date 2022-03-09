<script setup lang="ts">
// import UserCalendar from "@/components/UserCalendar.vue";
import UserAccountSummary from "@/components/UserAccountSummary.vue";
import UserDailyTransaction from "@/components/UserDailyTransaction.vue";
import UserTransactionButton from "@/components/UserTransactionButton.vue";
</script>

<template>
  <main>
    <div class="main_content">
      <div class="transactions">
        <!-- <UserCalendar /> -->
        <UserAccountSummary />
        <UserDailyTransaction />
      </div>
      <UserTransactionButton />
    </div>
  </main>
</template>

<style scoped>
.main_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}
</style>
