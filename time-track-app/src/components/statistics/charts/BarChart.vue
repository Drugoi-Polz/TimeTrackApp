<script setup>
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import { toMinutes } from '../../../functions/timeFunctions'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { getBarChartData, getLegendItems } from '../../../functions/chartData'

import ChartEnvirement from './ChartEnvirement.vue'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
})

const chartData = computed(() => getBarChartData(props.data, toMinutes))

const legendItems = computed(() =>
	getLegendItems({
		data: props.data,
		chartData: chartData.value,
	})
)

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,

	scales: {
		y: {
			beginAtZero: true,
		},
		x: {
			grid: { display: false },
			ticks: { display: false },
		},
	},

	plugins: {
		legend: false,
		tooltip: {
			callbacks: {
				label: (ctx) => `${ctx.label}: ${ctx.raw}м`,
			},
		},
	},
	animation: { duration: 600, easing: 'easeOutQuart' },
}
</script>

<template>
	<ChartEnvirement :legend-items="legendItems">
		<Bar :data="chartData" :options="chartOptions" />
	</ChartEnvirement>
</template>
