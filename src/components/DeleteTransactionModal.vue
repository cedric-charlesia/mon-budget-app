<script setup lang="ts">
import DeleteTransactionModalFormItem from "./DeleteTransactionModalFormItem.vue";
import { ref } from "vue";
import { loggedInUserStore } from "@/stores/loggedInUser";
import { useToast } from "vue-toastification";

const user = loggedInUserStore();

const toast = useToast();

const categoryId = ref(user.transaction.category_id);
const transactionId = ref(user.transaction.id);

const deleteTransaction = async () => {
  try {
    toast.error("Transaction supprimée !");

    return {
      user: user.deleteTransaction(categoryId.value, transactionId.value),
    };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <teleport to="#modals">
    <div class="modal" v-if="user.showDeleteModal">
      <DeleteTransactionModalFormItem>
        <template #modalTitle>
          <h2>Supprimer cette transaction ?</h2>
        </template>
        <template #cancelDeleteTransactionButton>
          <button @click.prevent="user.showDeleteModal = !user.showDeleteModal">
            Annuler
          </button>
        </template>

        <template #deleteTransactionButton>
          <button @click.prevent="deleteTransaction()">Valider</button>
        </template>
      </DeleteTransactionModalFormItem>
    </div>
  </teleport>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: auto;
  text-align: center;
  background-color: var(--grey-color);
}
</style>
