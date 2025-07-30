<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'
import ChartsLegend from './ChartsLegend.vue'
import { getLegendItems, getPieChartData } from './chartData'
import { formatTime } from '../../functions'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
})

const chartData = computed(() => getPieChartData(props.data))

const legendItems = computed(() =>
	getLegendItems({
		data: props.data,
		chartData: chartData.value,
		format: 'seconds'
	})
)

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	cutout: '40%',
	plugins: {
		legend: { display: false },
		tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${formatTime(ctx.raw)}` } },
	},
}
</script>

<template>
	<div class="flex flex-col items-center w-full">
		<div class="w-full max-w-3xl bg-white rounded-xl shadow border border-gray-200 p-6">
			<h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">
				Распределение времени
			</h3>

			<div class="relative w-full h-64 sm:h-80 lg:h-96">
				<Pie class="absolute inset-0" :data="chartData" :options="chartOptions" />
			</div>
		</div>

		<ChartsLegend :items="legendItems" />
	</div>
</template>
