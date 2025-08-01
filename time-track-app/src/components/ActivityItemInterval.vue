<script setup>
import { formatTime, formatTimestamp } from '../functions'

import BaseTimeView from './UI/BaseTimeView.vue'

defineProps({
    intervalItem: Object
})
</script>

<template>
	<li
		class="flex justify-between items-center p-4 bg-gray-100 rounded-xl shadow hover:shadow-md transition-shadow duration-200"
	>
		<div class="flex items-center gap-3">
			<span class="text-lg font-bold text-gray-800">{{
				formatTimestamp(intervalItem.start)
			}}</span>
			<span class="text-lg">→</span>
			<span class="text-lg font-bold text-gray-800">{{ formatTimestamp(intervalItem.end) }}</span>
		</div>
		<BaseTimeView :time="formatTime(intervalItem.duration)" />
	</li>
</template>
