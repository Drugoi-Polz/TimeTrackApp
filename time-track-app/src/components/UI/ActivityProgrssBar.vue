<script setup>
import { computed } from 'vue'
import { totalDuration } from '../../functions';

const props = defineProps({
    activities: Array,
    activity: Object
})
//TO DO: вынести в chartData.js / functiuons.js
const totalDayDuration = computed(() =>
	props.activities.reduce((sum, act) => sum + totalDuration(act.intervals), 0)
)
</script>

<template>
	<div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
		<div
			class="h-full transition-all duration-500"
			:style="{
				width:
					((totalDuration(activity.intervals) / totalDayDuration) * 100).toFixed(2) + '%',
				backgroundColor: activity.color,
			}"
		/>
	</div>
</template>
