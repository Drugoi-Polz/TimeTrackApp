<script setup>
import { formatTime, formatTimestamp } from '../functions'

defineProps({
	activity: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div
		class="bg-gradient-to-br from-white to-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
	>
		<!-- Заголовок -->
		<div class="flex items-center justify-between mb-6">
			<div class="flex items-center gap-4">
				<div
					class="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-inner"
					:style="{ backgroundColor: activity.color }"
				>
					<component
						:is="activity.icon"
						class="h-6 w-6"
						:class="{ 'text-white': true }"
					/>
				</div>
				<div>
					<h2
						class="text-2xl font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200"
					>
						{{ activity.title }}
					</h2>
					<span class="text-sm text-gray-500 uppercase tracking-wide"
						>#{{ activity.category }}</span
					>
				</div>
			</div>
			<div class="text-gray-400 text-sm flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-gray-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10m-10 4h10m-5 4v-4"
					/>
				</svg>
				{{ activity.intervals.length }} интервал{{
					activity.intervals.length === 1 ? '' : 'а'
				}}
			</div>
		</div>

		<ul class="space-y-4">
			<li
				v-for="interval in activity.intervals"
				:key="interval.start"
				class="flex justify-between items-center p-4 bg-gray-100 rounded-xl shadow hover:shadow-md transition-shadow duration-200"
			>
				<div class="flex items-center gap-3">
					<span class="text-lg font-bold text-gray-800">{{
						formatTimestamp(interval.start)
					}}</span>
					<span class="text-lg" :style="{ color: activity.color }">→</span>
					<span class="text-lg font-bold text-gray-800">{{
						formatTimestamp(interval.end)
					}}</span>
				</div>
				<div
					class="font-mono text-lg font-bold text-gray-900 bg-gray-300 px-4 py-2 rounded-lg"
				>
					{{ formatTime(interval.duration) }}
				</div>
			</li>
		</ul>
	</div>
</template>
