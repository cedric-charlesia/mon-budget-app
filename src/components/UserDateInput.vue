<template>
    <q-input type="month" filled v-model="showToday" class="q-my-md q-mx-md" />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { date } from 'quasar';

defineComponent({
    name: 'UserDateInput',
    components: {},
});

const showToday = ref(date.formatDate(Date.now(), 'YYYY-MM'));

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