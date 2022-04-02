<template>
  <form class="user-form">
    <slot name="inputText">
      <input type="text" />
    </slot>

    <slot name="inputPassword">
      <input type="password" />
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
  border-radius: 0.15em;
  background-color: var(--grey-color);
}

.user-form button {
  border: none;
  background-color: var(--main-color);
  color: var(--accent-color);
  padding: 1.5rem;
  border-radius: 0.15em;
}
</style>
