<script setup lang="ts"></script>

<template>
  <main>
    <div class="main_content">
      <div class="transactions">
        <div class="calendar_details">
          <ul>
            <li><a href="">Jour</a></li>
            <li><a href="">Semaine</a></li>
            <li><a href="">Mois</a></li>
            <li><a href="">Année</a></li>
          </ul>
        </div>
        <section class="transaction_summary">
          <div>
            <p>Revenus</p>
            <p class="income">2200 €</p>
          </div>
          <div>
            <p>Dépenses</p>
            <p class="expense">70 €</p>
          </div>
          <div>
            <p>Total</p>
            <p class="transaction_total">2130 €</p>
          </div>
        </section>

        <section class="daily_transaction">
          <div class="daily_transaction_header">
            <p>12 Fév</p>
            <p>20 €</p>
            <p>2200 €</p>
          </div>

          <div class="daily_transaction_content">
            <p class="transaction_icon">N</p>
            <div class="transaction_details">
              <p>Nourriture</p>
              <div class="daily_transaction_total">
                <p>20 €</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div class="daily_transaction_content">
            <p class="transaction_icon">S</p>
            <div class="transaction_details">
              <p>Salaire</p>
              <div class="daily_transaction_total">
                <p>2200 €</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </section>

        <section class="daily_transaction">
          <div class="daily_transaction_header">
            <p>11 Fév</p>
            <p>50 €</p>
            <p>0 €</p>
          </div>

          <div class="daily_transaction_content">
            <p class="transaction_icon">N</p>
            <div class="transaction_details">
              <p>Nourriture</p>
              <div class="daily_transaction_total">
                <p>20 €</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div class="daily_transaction_content">
            <p class="transaction_icon">C</p>
            <div class="transaction_details">
              <p>Cadeau</p>
              <div class="daily_transaction_total">
                <p>30 €</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="transaction_button">
        <button type="submit">Ajouter une transaction</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main_content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80vh;
}

.calendar_details ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid var(--grey-color);
}

.calendar_details ul a,
.calendar_details ul a:hover,
.calendar_details ul a:visited {
  text-decoration: none;
}

.calendar_details ul a:active {
  text-decoration: underline;
  color: var(--accent-color);
}

.transaction_summary {
  display: flex;
  justify-content: space-between;
}

.income {
  color: #2eb086;
  font-weight: bold;
}

.expense {
  color: #da1212;
  font-weight: bold;
}

.transaction_total {
  color: #000;
  font-weight: bold;
}

.daily_transaction_header,
.daily_transaction_content,
.daily_transaction_total {
  display: flex;
  justify-content: space-between;
}

.daily_transaction_header p {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.daily_transaction_content {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid var(--grey-color);
}

.daily_transaction_total {
  align-items: center;
  gap: 0.5rem;
}

.daily_transaction_total input[type="checkbox"] {
  transform: scale(1.5);
}

.transaction_details {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 0.7rem;
}

.transaction_icon {
  padding: 0.5rem 0.6rem;
  margin: auto;
  border-radius: 50%;
  border: 2px solid var(--grey-color);
}

.transaction_button {
  /* height: 25%; */
  align-self: center;
}

.transaction_button button {
  cursor: pointer;
  padding: 1rem;
  border: none;
  background-color: var(--accent-color);
  color: var(--text-white-color);
}
</style>
