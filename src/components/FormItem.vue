<template>
  <form class="user-form">
    <slot name="inputText">
      <input type="text" />
    </slot>

    <slot name="inputPassword">
      <input type="password" />
    </slot>

    <slot name="formButton">
      <button></button>
    </slot>
  </form>
</template>

<style>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.user-form input {
  height: 1rem;
  padding: 1rem;
  border: none;
}

.user-form button {
  border: none;
  background-color: var(--accent-color);
  color: var(--grey-color);
  padding: 1.5rem;
}
</style>
