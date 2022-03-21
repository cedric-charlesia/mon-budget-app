<script setup lang="ts">
import { ref } from "vue";
import ModalFormItem from "./ModalFormItem.vue";
const showModal = ref(false);
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
            <input type="radio" id="income" name="transation-type" />
            <label for="income" name="income">Revenu</label>
          </div>
          <div>
            <input type="radio" id="expense" name="transation-type" />
            <label for="expense" name="expense">Dépense</label>
          </div>
        </template>

        <template #categorySelection>
          <select name="category" id="transaction-category">
            <option value="">--- Choisir une categorie ---</option>
            <option value=""></option>
          </select>
        </template>

        <template #inputCategory>
          <input type="text" placeholder="Ajouter une nouvelle catégorie" />
        </template>

        <template #addCategoryButton>
          <button>Ajouter</button>
        </template>

        <template #transactionDate>
          <label
            class="date-label"
            for="transaction-date"
            name="transaction-date"
            >Choisir une date :</label
          >
          <input type="date" id="transaction-date" value="" />
        </template>

        <template #inputAmount>
          <input type="number" placeholder="Indiquer le montant..." />
        </template>

        <template #cancelTransactionButton>
          <button @click="showModal = !showModal">Annuler</button>
        </template>

        <template #addTransactionButton>
          <button>Valider</button>
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
