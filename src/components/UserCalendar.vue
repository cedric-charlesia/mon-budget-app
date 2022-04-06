<script setup lang="ts"></script>

<template>
  <div class="calendar_details">
    <ul>
      <li><a href="">Jour</a></li>
      <li><a href="">Semaine</a></li>
      <li><a href="">Mois</a></li>
      <li><a href="">Année</a></li>
    </ul>
  </div>
</template>

<style scoped>
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
</style>
