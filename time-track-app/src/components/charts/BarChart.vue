<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'

// Регистрация необходимых компонентов Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const chartData = computed(() => ({
  labels: props.data.map((item) => item.title),
  datasets: [
    {
      label: 'Общее время (мин)',
      data: props.data.map((item) =>
        Math.round(item.intervals.reduce((sum, i) => sum + i.duration, 0) / 60)
      ),
      backgroundColor: props.data.map((item) => item.color),
      borderRadius: 8,
      barThickness: 32,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
        color: '#4B5563', // gray-700
        font: { size: 12, weight: 'bold' },
      },
      grid: {
        color: '#E5E7EB', // gray-200
        borderDash: [4, 4],
      },
    },
    x: {
      ticks: {
        color: '#4B5563',
        font: { size: 12, weight: 'bold' },
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.raw} мин`,
      },
    },
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart',
  },
}
</script>

<template>
  <div v-if="data && data.length" class="p-6 bg-white rounded-xl shadow border border-gray-200 ">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Статистика по активностям</h2>
    <div class="relative h-[700px] ">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
  <div v-else class="text-gray-500 text-5xl flex justify-center mt-100">Нет статистики за выбранную дату</div>
</template>
