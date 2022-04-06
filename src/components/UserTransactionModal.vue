<script setup lang="ts">
import ModalFormItem from "./ModalFormItem.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

const user = loggedInUserStore();

const state = reactive({
  type: "",
  category_id: "",
  tag: "",
  date: "",
  description: "",
  amount: "",
});

const rules = computed(() => {
  return {
    category_id: {
      required: helpers.withMessage("Veuillez choisir une catégorie", required),
    },
    tag: {
      required: helpers.withMessage(
        "Veuillez indiquer une catégorie",
        required
      ),
    },
    date: {
      required: helpers.withMessage("Veuillez indiquer une date", required),
    },
    description: {
      required: helpers.withMessage(
        "Veuillez indiquer une description",
        required
      ),
    },
    amount: {
      required: helpers.withMessage("Veuillez indiquer un montant", required),
    },
  };
});

const v$ = useValidate(rules, state);

const addTransaction = async () => {
  v$.value.$validate();

  if (v$.value.$error) return;

  const formDataCategory = new FormData();
  const formDataTransaction = new FormData();

  formDataCategory.append("type", state.type);
  formDataCategory.append("tag", state.tag);

  formDataTransaction.append("category_id", state.category_id);
  formDataTransaction.append("date", state.date);
  formDataTransaction.append("description", state.description);
  formDataTransaction.append("amount", state.amount);

  try {
    interface Category {
      type: string;
      tag: string;
      user_id: number;
      [key: string]: unknown;
    }

    let category: Category = {
      type: "",
      tag: "",
      user_id: user.id,
    };

    for (let [key, val] of formDataCategory.entries()) {
      category[`${key}`] = `${val}`;
      JSON.stringify(category);
    }

    interface Transaction {
      category_id: number;
      date: string;
      description: string;
      amount: number;
      check: string;
      [key: string]: unknown;
    }

    let transaction: Transaction = {
      category_id: NaN,
      date: "",
      description: "",
      amount: NaN,
      check: "false",
    };

    for (let [key, val] of formDataTransaction.entries()) {
      transaction[`${key}`] = `${val}`;
      JSON.stringify(transaction);
    }
    return { user: user.addTransaction(category, transaction) };
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <button class="transaction_button" @click="user.showModal = !user.showModal">
    Ajouter un montant
  </button>
  <teleport to="#modals">
    <div class="modal" v-if="user.showModal">
      <ModalFormItem>
        <template #modalRadio>
          <div>
            <input
              v-model.lazy="state.type"
              type="radio"
              id="income"
              name="transation-type"
              value="revenu"
              required
              checked
            />
            <label for="income" name="income">Revenu</label>
          </div>
          <div>
            <input
              v-model.lazy="state.type"
              type="radio"
              id="expense"
              name="transation-type"
              value="dépense"
            />
            <label for="expense" name="expense">Dépense</label>
          </div>
        </template>

        <template #categorySelection>
          <select
            v-model.lazy="state.category_id"
            name="category"
            :disabled="state.tag !== ''"
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
          <span
            :class="state.tag !== '' ? 'hide' : 'show'"
            v-if="v$.category_id.$error"
            class="error"
            >{{ v$.category_id.$errors[0].$message }}</span
          >
        </template>

        <template #inputCategory>
          <label
            class="add-category-label"
            for="add-category-"
            name="add-category"
            >Si la catégorie n'existe pas, créez-là :</label
          >
          <input
            v-model.lazy="state.tag"
            type="text"
            :disabled="state.category_id !== ''"
            placeholder="Ajouter une nouvelle catégorie"
          />
          <span
            :class="state.category_id !== '' ? 'hide' : 'show'"
            v-if="v$.tag.$error"
            class="error"
            >{{ v$.tag.$errors[0].$message }}</span
          >
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

        <template #inputDescription>
          <input
            v-model.lazy="state.description"
            type="text"
            placeholder="Ajouter une description..."
            required
          />
          <span v-if="v$.description.$error" class="error">{{
            v$.description.$errors[0].$message
          }}</span>
        </template>

        <template #inputAmount>
          <input
            v-model.lazy="state.amount"
            type="number"
            placeholder="Indiquer le montant..."
            required
          />
          <span v-if="v$.amount.$error" class="error">{{
            v$.amount.$errors[0].$message
          }}</span>
        </template>

        <template #cancelTransactionButton>
          <button @click.prevent="user.showModal = !user.showModal">
            Fermer
          </button>
        </template>

        <template #addTransactionButton>
          <button @click.prevent="addTransaction()">Valider</button>
        </template>
      </ModalFormItem>
    </div>
  </teleport>
</template>

<style scoped>
.transaction_button {
  background-color: var(--main-color);
  color: var(--accent-color);
  cursor: pointer;
  padding: 1rem;
  border: none;
  align-self: center;
  width: 50%;
}
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

.hide {
  display: none;
}

.show {
  display: inline;
}
</style>
