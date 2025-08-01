<script setup>
import { formatTime, formatTimestamp, totalDuration } from '../functions'

import DoubleText from './UI/DoubleText.vue'
import BaseTimeView from './UI/BaseTimeView.vue'
import ActivityProgrssBar from './UI/ActivityProgrssBar.vue'

const props = defineProps({
	activities: {
		type: Array,
		required: true,
	},
})
</script>

<template>

		<div
			v-for="activity in activities"
			:key="activity.id"
			class="p-6 bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition mt-6"
		>
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold text-gray-800">{{ activity.title }}</h2>
				<BaseTimeView :time="formatTime(totalDuration(activity.intervals))" />
			</div>

			<ActivityProgrssBar
				:activities="activities"
				:activity="activity"
			/>
			<div class="grid grid-cols-2">
				<DoubleText :label="'Интервалов'" :value="activity.intervals.length" />
				<DoubleText	:label="'Общее время'" :value="formatTime(totalDuration(activity.intervals))"/>
				<DoubleText :label="'C'" :value="formatTimestamp(activity.intervals[0].start)" />
				<DoubleText :label="'По'" :value="formatTimestamp(activity.intervals.at(-1).end)" />
			</div>
		</div>
</template>
