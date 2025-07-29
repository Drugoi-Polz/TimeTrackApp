<script setup>
import { formatTime, formatTimestamp } from '../functions'
import { computed } from 'vue'
import DoubleText from './UI/DoubleText.vue'

const props = defineProps({
	activities: {
		type: Array,
		required: true,
	},
})

function totalDuration(intervals) {
	return intervals.reduce((sum, i) => sum + i.duration, 0)
}

const totalDayDuration = computed(() =>
	props.activities.reduce((sum, act) => sum + totalDuration(act.intervals), 0)
)
</script>

<template>
	<div v-if="activities && activities.length" class="space-y-6 mt-6">
		<div
			v-for="activity in activities"
			:key="activity.id"
			class="p-6 bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition"
		>
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold text-gray-800">{{ activity.title }}</h2>
				<span
					class="text-xl bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium"
				>
					{{ formatTime(totalDuration(activity.intervals)) }}
				</span>
			</div>

			<div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
				<div
					class="h-full transition-all duration-500"
					:style="{
						width:
							((totalDuration(activity.intervals) / totalDayDuration) * 100).toFixed(
								2
							) + '%',
						backgroundColor: activity.color,
					}"
				/>
			</div>

			<div class="text-sm text-gray-600 grid grid-cols-2 gap-y-1">
                <DoubleText :label="'Интервалов'" :value="activity.intervals.length" />
				<DoubleText :label="'Общее время'" :value="formatTime(totalDuration(activity.intervals))" />
                <DoubleText :label="'C'" :value="formatTimestamp(activity.intervals[0].start)" />
                <DoubleText :label="'По'" :value="formatTimestamp(activity.intervals.at(-1).end)" />
			</div>
		</div>
	</div>
	<div v-else class="text-gray-500 text-5xl flex justify-center mt-100">Нет статистики за выбранную дату</div>
</template>
