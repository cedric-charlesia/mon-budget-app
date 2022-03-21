<template>
  <form class="modal-form">
    <div class="transaction-type">
      <slot name="modalRadio">
        <input type="radio" id="" name="" />
        <label for="" name=""></label>
      </slot>
    </div>
    <slot name="categorySelection">
      <select name="" id="">
        <option value=""></option>
      </select>
    </slot>
    <div class="add-category">
      <slot name="inputCategory">
        <input type="text" />
      </slot>
      <slot name="addCategoryButton">
        <button></button>
      </slot>
    </div>
    <slot name="transactionDate">
      <label for="" name="" class="date-label"></label>
      <input type="date" id="" value="" />
    </slot>
    <slot name="inputAmount">
      <input type="number" />
    </slot>
    <div class="transaction-validation">
      <slot name="cancelTransactionButton">
        <button></button>
      </slot>
      <slot name="addTransactionButton">
        <button></button>
      </slot>
    </div>
  </form>
</template>

<style>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.date-label {
  text-align: left;
}

.modal-form .transaction-type {
  display: flex;
  justify-content: space-between;
}

.modal-form .transaction-type input[type="radio"] {
  appearance: none;
  width: 1.75rem;
  height: 1.75rem;
  color: var(--accent-color);
  border: 0.15em solid currentColor;
  border-radius: 50%;
  display: inline-grid;
  place-content: center;
}

.modal-form .transaction-type input[type="radio"]::before {
  content: "";
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--accent-color);
}

.modal-form .transaction-type input[type="radio"]:checked::before {
  transform: scale(1);
}

.modal-form .transaction-type label {
  margin: 0.25rem;
}

.modal-form select {
  padding: 0.5rem;
  background-color: var(--grey-color);
  border: 1px solid var(--text-white-color);
  text-align: center;
}

.modal-form input[type="text"],
.modal-form input[type="date"],
.modal-form input[type="number"] {
  height: 1rem;
  padding: 1rem;
  border: none;
  background-color: var(--grey-color);
  border-radius: 0.15em;
}

.modal-form .add-category {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-form .add-category button {
  width: 50%;
  margin: auto;
}

.modal-form .transaction-validation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-form button {
  border: none;
  background-color: var(--accent-color);
  color: var(--grey-color);
  padding: 1rem;
  border-radius: 0.15em;
}
</style>
