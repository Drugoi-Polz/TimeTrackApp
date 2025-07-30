<script setup>
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import { toMinutes } from '../../functions'
import ChartsLegend from './ChartsLegend.vue'

import {
	Chart as ChartJS,
	Title,
	Tooltip,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js'

import { getBarChartData, getLegendItems } from './chartData'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const props = defineProps({
	data: {
		type: Array,
		required: true
	},
})

const chartData = computed(() => getBarChartData(props.data, toMinutes))

const legendItems = computed(() =>
	getLegendItems({
		data: props.data,
		chartData: chartData.value,
		format: 'minutes',
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
	<div class="flex flex-col items-center w-full">
		<div class="w-full max-w-3xl bg-white rounded-xl shadow border border-gray-200 p-6">
			<Bar :data="chartData" :options="chartOptions" class="w-full h-full" />
		</div>

		<ChartsLegend :items="legendItems" />
	</div>
</template>