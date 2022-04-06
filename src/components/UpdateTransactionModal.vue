<script setup lang="ts">
import TransactionModalFormItem from "./TransactionModalFormItem.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

const user = loggedInUserStore();

const state = reactive({
  description: user.transaction.description,
  category_id: "",
  amount: user.transaction.amount,
  date: "",
});

const rules = computed(() => {
  return {
    description: {
      required: helpers.withMessage(
        "Veuillez indiquer une description",
        required
      ),
    },
    category_id: {
      required: helpers.withMessage("Veuillez choisir une catégorie", required),
    },
    amount: {
      required: helpers.withMessage("Veuillez indiquer un montant", required),
    },
    date: {
      required: helpers.withMessage("Veuillez choisir une date", required),
    },
  };
});

const v$ = useValidate(rules, state);

const updateTransaction = async () => {
  v$.value.$validate();

  if (v$.value.$error) return;

  try {
    return {
      transaction: user.updateTransaction(
        state.date,
        state.description,
        Number(state.amount),
        Number(state.category_id),
        Number(user.transaction.id)
      ),
    };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <teleport to="#modals">
    <div class="modal" v-if="user.showUpdateModal">
      <TransactionModalFormItem>
        <template #inputDescription>
          <input
            v-model.lazy="state.description"
            type="text"
            placeholder="Modifier la description..."
            required
          />
          <span v-if="v$.description.$error" class="error">{{
            v$.description.$errors[0].$message
          }}</span>
        </template>

        <template #categorySelection>
          <select
            v-model.lazy="state.category_id"
            name="category"
            id="transaction-category"
          >
            <option value="">--- Choisir une categorie ---</option>
            <option
              v-for="category of user.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.tag }}
            </option>
          </select>
          <span v-if="v$.category_id.$error" class="error">{{
            v$.category_id.$errors[0].$message
          }}</span>
        </template>

        <template #inputAmount>
          <input
            v-model.lazy="state.amount"
            type="number"
            placeholder="Modifier le montant..."
            required
          />
          <span v-if="v$.amount.$error" class="error">{{
            v$.amount.$errors[0].$message
          }}</span>
        </template>

        <template #transactionDate>
          <label
            class="date-label"
            for="transaction-date"
            name="transaction-date"
            >Choisir une date :</label
          >
          <input
            v-model.lazy="state.date"
            type="date"
            id="transaction-date"
            required
          />
          <span v-if="v$.date.$error" class="error">{{
            v$.date.$errors[0].$message
          }}</span>
        </template>

        <template #cancelUpdateTransactionButton>
          <button @click.prevent="user.showUpdateModal = !user.showUpdateModal">
            Fermer
          </button>
        </template>

        <template #updateTransactionButton>
          <button @click.prevent="updateTransaction()">Valider</button>
        </template>
      </TransactionModalFormItem>
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
  background-color: var(--modal-bg-color);
}
</style>
