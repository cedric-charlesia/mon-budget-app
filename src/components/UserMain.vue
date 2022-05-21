<script setup lang="ts">
import UserDailyTransaction from "@/components/UserDailyTransaction.vue";
import UserTransactionModal from "@/components/UserTransactionModal.vue";
</script>

<template>
  <main class="user-main">
    <div class="main_content">
      <UserDailyTransaction />
    </div>
    <UserTransactionModal />
  </main>
</template>

<style scoped>
.user-main {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.main_content {
  height: 90%;
  overflow-y: auto;
}
</style>
