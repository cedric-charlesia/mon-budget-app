<template>
    <q-card square class="my-card q-my-md q-mx-md">
        <q-tabs v-model="dateTab" dense class="text-grey-7" active-color="primary" indicator-color="primary"
            align="justify" narrow-indicator>
            <q-tab name="Year" label="Ann&eacute;e" @click="updateCurrentYear" />
            <q-tab name="Month" label="Mois" @click="updateCurrentMonth" />
            <q-tab name="Day" label="Jour" @click="updateCurrentDay" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="dateTab" animated>
            <q-tab-panel name="Year" class="q-pa-none">
                <q-input type="number" min="1900" max="2099" step="1" filled v-model="showYear" dense
                    class="q-my-md q-mx-md" @focus="updateCurrentYear" @change="updateCurrentYear" />
            </q-tab-panel>

            <q-tab-panel name="Month" class="q-pa-none">
                <q-input type="month" filled v-model="showMonth" dense class="q-my-md q-mx-md"
                    @click="updateCurrentMonth" @change="updateCurrentMonth" />
            </q-tab-panel>

            <q-tab-panel name="Day" class="q-pa-none">
                <q-input type="date" filled v-model="showToday" dense class="q-my-md q-mx-md" @click="updateCurrentDay"
                    @change="updateCurrentDay" />
            </q-tab-panel>
        </q-tab-panels>

    </q-card>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { userStore } from 'stores/userStore';
const user = userStore();

defineComponent({
    name: 'UserDateInput',
    components: {},
});

const dateTab = ref('Month');

const showYear = ref(user.currentYear);
const showMonth = ref(user.currentMonth);
const showToday = ref(user.currentDay);

const updateCurrentYear = () => {
    user.selectedDate = showYear.value;

    user.noTransaction = false;

    for (const transactionDate of user.dates) {
        if (transactionDate.includes(user.selectedDate)) {
            user.noTransaction = true;
        }
    }
}

const updateCurrentMonth = () => {
    user.selectedDate = showMonth.value;

    user.noTransaction = false;

    for (const transactionDate of user.dates) {
        if (transactionDate.includes(user.selectedDate)) {
            user.noTransaction = true;
        }
    }
}

const updateCurrentDay = () => {
    user.selectedDate = showToday.value;

    user.noTransaction = false;

    for (const transactionDate of user.dates) {
        if (transactionDate.includes(user.selectedDate)) {
            user.noTransaction = true;
        }
    }
}
</script>

<style>
input[type="month"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0;
    width: 10%;
    height: 50%;
    background-image: url('/icons/calendar_month_black_24dp.svg');
}
</style>