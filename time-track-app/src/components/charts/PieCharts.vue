<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

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
			data: props.data.map((item) => item.intervals.reduce((sum, i) => sum + i.duration, 0)),
			backgroundColor: props.data.map((item) => item.color),
			borderWidth: 0,
			spacing: 2,
		},
	],
}))

const formatTime = (seconds) => {
	const hrs = Math.floor(seconds / 3600)
	const mins = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60

	if (hrs > 0) return `${hrs}h ${mins}m`
	if (mins > 0) return `${mins}m ${secs}s`
	return `${secs}s`
}

const legendItems = computed(() => {
	const totalDuration = chartData.value.datasets[0].data.reduce((a, b) => a + b, 0)

	return props.data.map((item, index) => {
		const value = chartData.value.datasets[0].data[index]
		const percentage = totalDuration > 0 ? Math.round((value / totalDuration) * 100) : 0

		return {
			title: item.title,
			color: item.color,
			value: formatTime(value),
			percentage: `${percentage}%`,
		}
	})
})

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	cutout: '50%',
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: (context) => {
					const label = context.label || ''
					const value = context.raw || 0
					return `${label}: ${formatTime(value)}`
				},
			},
		},
	},
}
</script>

<template>
	<div v-if="data && data.length" class="flex flex-col h-full">

		<div class="h-128 flex items-center justify-center">
			<Pie :data="chartData" :options="chartOptions" />
		</div>

		<div class="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
			<div
				v-for="(item, index) in legendItems"
				:key="index"
				class="p-3 bg-gray-200 rounded-lg transition-all duration-200 hover:bg-gray-300 shadow-md hover:-translate-y-0.5"
			>
				<div class="flex items-center">
					<div
						class="w-5 h-5 rounded-full flex-shrink-0"
						:style="{ backgroundColor: item.color }"
					></div>

					<div class="ml-3 min-w-0 flex-1">
						<p class="text-2xs font-medium text-black truncate">
							{{ item.title }}
						</p>
						<div class="flex justify-between mt-1">
							<span class="text-2xs font-bold text-indigo-900">
								{{ item.value }}
							</span>
							<span class="text-2xs font-bold text-indigo-900">
								{{ item.percentage }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="text-gray-500 text-5xl flex justify-center mt-100">Нет статистики за выбранную дату</div>
</template>
