<template>
  <form class="delete-modal-form">
    <slot name="modalTitle">
      <h2></h2>
    </slot>
    <div class="transaction-validation">
      <slot name="cancelDeleteTransactionButton">
        <button></button>
      </slot>
      <slot name="deleteTransactionButton">
        <button></button>
      </slot>
    </div>
  </form>
</template>

<style>
.delete-modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.delete-modal-form .transaction-validation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.delete-modal-form button {
  border: none;
  background-color: var(--main-color);
  color: var(--accent-color);
  padding: 0.75rem;
  border-radius: 0.15em;
}
</style>
