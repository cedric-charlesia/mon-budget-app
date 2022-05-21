<template>
  <form class="modal-form">
    <div class="transaction-type">
      <slot name="modalTransactionType">
        <label for="" name=""></label>
        <select name="" id="">
          <option value=""></option>
        </select>
      </slot>
    </div>
    <slot name="categorySelection">
      <label for="" name="" class="select-category-label"></label>
      <select name="" id="">
        <option value=""></option>
      </select>
    </slot>
    <div class="add-category">
      <slot name="inputCategory">
        <label for="" name="" class="add-category-label"></label>
        <input type="text" />
      </slot>
    </div>
    <slot name="transactionDate">
      <label for="" name="" class="date-label"></label>
      <input type="date" id="" value="" required />
    </slot>
    <slot name="inputDescription">
      <input type="text" required />
    </slot>
    <slot name="inputAmount">
      <input type="number" required />
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

.select-type-label,
.select-category-label,
.add-category-label,
.date-label {
  text-align: left;
}

.modal-form .transaction-type {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-form .transaction-type input[type="radio"] {
  appearance: none;
  width: 1.75rem;
  height: 1.75rem;
  color: var(--main-color);
  border: 0.15rem solid currentColor;
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
  background-color: var(--main-color);
}

.modal-form .transaction-type input[type="radio"]:checked::before {
  transform: scale(1);
}

.modal-form .transaction-type label {
  margin: 0.25rem;
}

.modal-form select {
  padding: 0.5rem;
  background-color: var(--white-color);
  border: 1px solid var(--text-white-color);
  text-align: center;
}

.modal-form input[type="text"],
.modal-form input[type="date"],
.modal-form input[type="number"] {
  height: 1rem;
  padding: 0.75rem;
  border: none;
  background-color: var(--white-color);
  border-radius: 0.15em;
}

.modal-form .add-category {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-form .transaction-validation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-form button {
  border: none;
  background-color: var(--main-color);
  color: var(--accent-color);
  padding: 0.75rem;
  border-radius: 0.15em;
}
</style>
