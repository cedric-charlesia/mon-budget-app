<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { PieChart, usePieChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

import { userStore } from "@/stores/userStore";

const store = userStore();

Chart.register(...registerables);
defineComponent({
  name: "UserChartDetails",
  components: { PieChart },
});

/* Generate random colors */
const generateRandomColor = () => {
  const maxVal = 0xFFFFFF;
  let randomNumber = Math.floor(Math.random() * maxVal).toString(16);
  let randColor = randomNumber.padStart(6, "0");
  return `#${randColor.toUpperCase()}`
}

    const userData = computed<ChartData<"pie">>(() => ({
      labels: store.dataLabels,
      datasets: [
        {
          data: store.dataValues,
          backgroundColor: [
            generateRandomColor(),
            generateRandomColor(),
            generateRandomColor(),
            generateRandomColor(),
            generateRandomColor(),
          ],
        },
      ],
    }));

    const options = computed<ChartOptions<"pie">>(() => ({
      maintainAspectRatio: false,
      scales: {
        myScale: {
          type: "logarithmic",
          display: false,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            font: {
              size: 16,
              family: "sans-serif",
            },
            color: "#000"
          }
        },
        title: {
          display: false,
          text: "Transactions",
        },
      },
    }));

     const { pieChartProps } = usePieChart({
      chartData: userData,
      options,
    });
</script>

<template>
  <div>
    <div v-if="store.isChartVisible === false" class="cart-calendar"><p>Sélectionner un mois dans le calendrier au-dessus</p></div>
    <div v-else class="cart-calendar">
    </div>
    <PieChart v-bind="pieChartProps" />
  </div>
</template>

<style scoped>
.chart-calendar {
  display: flex;
  justify-content: center;
}
</style>