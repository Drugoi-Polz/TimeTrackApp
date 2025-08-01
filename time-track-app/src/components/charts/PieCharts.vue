<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'
import { getLegendItems, getPieChartData } from './chartData'
import { formatTime } from '../../functions'

import ChartEnvirement from './ChartEnvirement.vue'

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
		format: 'seconds',
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
	<ChartEnvirement :legend-items="legendItems">
		<Pie :data="chartData" :options="chartOptions" />
	</ChartEnvirement>
</template>
