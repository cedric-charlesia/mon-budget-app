<script setup lang="ts">
import UserTransactionHeader from "@/components/UserTransactionHeader.vue";
import UpdateTransactionModal from "@/components/UpdateTransactionModal.vue";
import DeleteTransactionModal from "@/components/DeleteTransactionModal.vue";
import { loggedInUserStore } from "@/stores/loggedInUser";
import router from "@/router";

const user = loggedInUserStore();

const back = () => {
  router.go(-1);
};
</script>

<template>
  <UserTransactionHeader mainTitle="Mon Budget" />
  <div class="transaction-modal">
    <ul>
      <li>
        Date :
        {{
          new Date(user.transaction.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}
      </li>
      <li>Description : {{ user.transaction.description }}</li>
      <li>Montant : {{ user.transaction.amount }} &euro;</li>
    </ul>

    <div class="transaction-btn">
      <button
        class="btn update"
        @click="user.showUpdateModal = !user.showUpdateModal"
      >
        Modifier
      </button>
      <UpdateTransactionModal />

      <button
        class="btn delete"
        @click.prevent="user.showDeleteModal = !user.showDeleteModal"
      >
        Supprimer
      </button>
      <DeleteTransactionModal />

      <button class="btn back" @click="back()">
        Retour à la page précédente
      </button>
    </div>
  </div>
</template>

<style>
.transaction-modal ul {
  padding: 0;
}
.transaction-modal li {
  padding: 0.5rem;
  border: 0.15rem solid #000;
  list-style: none;
  text-transform: capitalize;
}

.transaction-btn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  border: none;
  padding: 1.5rem;
  border-radius: 0.15em;
  cursor: pointer;
}

.back {
  background-color: var(--main-color);
}

.update {
  background-color: #248f6d;
}

.delete {
  background-color: #da1212;
}
</style>
