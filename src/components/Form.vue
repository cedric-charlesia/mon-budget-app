<template>
    <form action="#" method="post" class="signup_form">
        <slot name="form"></slot>
    </form>
    <div class="switch_form">
        <slot name="switch_form"></slot>
    </div>
</template>

<style>
.signup_form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.signup_form input {
    height: 1rem;
    padding: 1rem;
    border: none;
}

.signup_form button {
    border: none;
    background-color: var(--accent-color);
    color: var(--grey-color);
    padding: 1.5rem;
}

.switch_form {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.switch_form a,
.switch_form a:active,
.switch_form a:hover,
.switch_form a:visited {
  text-decoration: none;
  color: var(--accent-color);
  font-weight: bold;
}
</style>