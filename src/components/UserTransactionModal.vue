<script setup lang="ts">
import { ref } from "vue";
import ModalFormItem from "./ModalFormItem.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";

const user = loggedInUserStore();

const showModal = ref(false);

const type = ref("");
const category_id = ref("");
const tag = ref("");
const date = ref("");
const description = ref("");
const amount = ref("");

const addTransaction = async () => {
  const formDataCategory = new FormData();
  const formDataTransaction = new FormData();

  formDataCategory.append("type", type.value);
  formDataCategory.append("tag", tag.value);

  formDataTransaction.append("category_id", category_id.value);
  formDataTransaction.append("date", date.value);
  formDataTransaction.append("description", description.value);
  formDataTransaction.append("amount", amount.value);

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
      [key: string]: unknown;
    }

    let transaction: Transaction = {
      category_id: NaN,
      date: "",
      description: "",
      amount: NaN,
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
  <div class="transaction_button">
    <button @click="showModal = !showModal">Ajouter un montant</button>
  </div>
  <teleport to="#modals">
    <div class="modal" v-if="showModal">
      <ModalFormItem>
        <template #modalRadio>
          <div>
            <input
              v-model.lazy="type"
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
              v-model.lazy="type"
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
            v-model.lazy="category_id"
            name="category"
            :disabled="tag !== ''"
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
        </template>

        <template #inputCategory>
          <label
            class="add-category-label"
            for="add-category-"
            name="add-category"
            >Si la catégorie n'existe pas, créez-là :</label
          >
          <input
            v-model.lazy="tag"
            type="text"
            :disabled="category_id !== ''"
            placeholder="Ajouter une nouvelle catégorie"
          />
        </template>

        <template #transactionDate>
          <label
            class="date-label"
            for="transaction-date"
            name="transaction-date"
            >Choisir une date :</label
          >
          <input
            v-model.lazy="date"
            type="date"
            id="transaction-date"
            required
          />
        </template>

        <template #inputDescription>
          <input
            v-model.lazy="description"
            type="text"
            placeholder="Ajouter une description..."
            required
          />
        </template>

        <template #inputAmount>
          <input
            v-model.lazy="amount"
            type="number"
            placeholder="Indiquer le montant..."
            required
          />
        </template>

        <template #cancelTransactionButton>
          <button @click.prevent="showModal = !showModal">Fermer</button>
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
  /* height: 25%; */
  align-self: center;
}

.transaction_button button {
  cursor: pointer;
  padding: 1rem;
  margin-top: 0.7rem;
  border: none;
  background-color: var(--accent-color);
  color: var(--text-white-color);
  border-radius: 0.15em;
}
.modal {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: auto;
  text-align: center;
  background-color: var(--text-white-color);
}
</style>
