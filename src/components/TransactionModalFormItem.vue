<template>
  <form class="transaction-modal-form">
    <slot name="inputDescription">
      <input type="text" required />
    </slot>
    <slot name="categorySelection">
      <select name="" id="">
        <option value=""></option>
      </select>
    </slot>
    <slot name="inputAmount">
      <input type="number" required />
    </slot>

    <slot name="transactionDate">
      <label for="" name="" class="date-label"></label>
      <input type="date" id="" value="" required />
    </slot>
    <div class="transaction-validation">
      <slot name="cancelUpdateTransactionButton">
        <button></button>
      </slot>
      <slot name="updateTransactionButton">
        <button></button>
      </slot>
    </div>
  </form>
</template>

<style>
.transaction-modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.add-category-label,
.date-label {
  text-align: left;
}

.transaction-modal-form .transaction-type {
  display: flex;
  justify-content: space-between;
}

.transaction-modal-form .transaction-type input[type="radio"] {
  appearance: none;
  width: 1.75rem;
  height: 1.75rem;
  color: var(--main-color);
  border: 0.15rem solid currentColor;
  border-radius: 50%;
  display: inline-grid;
  place-content: center;
}

.transaction-modal-form .transaction-type input[type="radio"]::before {
  content: "";
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--main-color);
}

.transaction-modal-form .transaction-type input[type="radio"]:checked::before {
  transform: scale(1);
}

.transaction-modal-form .transaction-type label {
  margin: 0.25rem;
}

.transaction-modal-form select {
  padding: 0.5rem;
  background-color: var(--white-color);
  border: 1px solid var(--text-white-color);
  text-align: center;
}

.transaction-modal-form input[type="text"],
.transaction-modal-form input[type="date"],
.transaction-modal-form input[type="number"] {
  height: 1rem;
  padding: 0.75rem;
  border: none;
  background-color: var(--white-color);
  border-radius: 0.15em;
}

.transaction-modal-form .add-category {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transaction-modal-form .transaction-validation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.transaction-modal-form button {
  border: none;
  background-color: var(--main-color);
  color: var(--accent-color);
  padding: 0.75rem;
  border-radius: 0.15em;
}
</style>
