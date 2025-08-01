<script setup>
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'
import { DANGER_BUTTON, ICON_BUTTON_CONTENT, PRIMARY_BUTTON } from '../constans'
import { isTaskValid } from '../validators'

import BaseButton from './UI/BaseButton.vue'
import Timer from './Timer.vue'

const props = defineProps({
	task: Object,
	required: true,
	validator: isTaskValid,
})
const emit = defineEmits(['edit', 'delete', 'start', 'stop'])
</script>

<template>
	<div class="rounded-xl flex justify-between shadow-2xs p-4 bg-white hover:shadow-xl hover:shadow-gray-200">
		<div class="flex items-start gap-4 flex-1 min-w-0">
			<div
					class="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-inner"
					:style="{ backgroundColor: task.color }"
				>
					<component
						:is="task.icon"
						class="h-6 w-6 text-white"
					/>
				</div>

			<div class="min-w-0 flex-1">
				<h2
					class="text-2xl font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200"
				>
					{{ task.title }}
				</h2>
				<span class="text-sm text-gray-500 uppercase tracking-wide"
					>#{{ task.category }}</span
				>
				<p class="text-black/90 text-sm mt-1 line-clamp-2">{{ task.description }}</p>
			</div>
		</div>

		<div class="flex gap-2 items-center ml-4 shrink-0">
			<Timer
				:initial="task.elapsed"
				:taskId="task.id"
				@start="() => $emit('start', task)"
				@stop="(interval) => $emit('stop', { task, interval })"
			></Timer>
			<BaseButton
				:contentType="ICON_BUTTON_CONTENT"
				:variant="PRIMARY_BUTTON"
				@click="$emit('edit', task)"
			>
				<PencilIcon />
			</BaseButton>
			<BaseButton
				:contentType="ICON_BUTTON_CONTENT"
				:variant="DANGER_BUTTON"
				@click="$emit('delete', task)"
			>
				<TrashIcon />
			</BaseButton>
		</div>
	</div>
</template>
