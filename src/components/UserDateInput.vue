<template>
    <q-input type="month" filled v-model="showToday" class="q-my-md q-mx-md" @change="updateCurrentMonth"
        label="Changer de mois" />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'UserDateInput',
    components: {},
});

const showToday = ref(user.currentMonth);

const updateCurrentMonth = () => {
    user.currentMonth = showToday.value;

    user.noTransaction = false;

    for (const transactionDate of user.dates) {
        if (transactionDate.includes(user.currentMonth)) {
            user.noTransaction = true;
        }
    }
    console.log(user.noTransaction);
}
</script>

<style>
input[type="month"]::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0;
    width: 10%;
    height: 50%;
    background-image: url('/icons/calendar_month_black_24dp.svg');
}
</style>