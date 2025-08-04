<script setup>
import ActivityItemInterval from './ActivityItemInterval.vue'

defineProps({
	activity: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
		<div class="flex items-center justify-between mb-6">
			<div class="flex items-center gap-4">
				<div
					class="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-inner"
					:style="{ backgroundColor: activity.color }"
				>
					<component
						:is="activity.icon"
						class="h-6 w-6 text-white"
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
				{{ activity.intervals.length }} интервал{{
					activity.intervals.length === 1
						? ''
						: activity.intervals.length <= 4
						? 'а'
						: 'ов'
				}}
			</div>
		</div>

		<ul class="space-y-4">
			<ActivityItemInterval
				v-for="interval in activity.intervals"
				:interval-item="interval"
				:key="interval.start"
			/>
		</ul>
	</div>
</template>
