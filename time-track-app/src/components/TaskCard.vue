<script setup>
import { defineProps, computed } from 'vue'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'

import BaseButton from './UI/BaseButton.vue'
import { DANGER_BUTTON, ICON_BUTTON_CONTENT, PRIMARY_BUTTON } from '../constans'
import { isTaskValid } from '../validators'
import Timer from './Timer.vue'

const props = defineProps({
	task: Object,
	required: true,
	validator: isTaskValid,
})
const emit = defineEmits(['edit', 'delete', 'start', 'stop'])

const cardStyle = computed(() => `background-color: ${props.task.color || '#b2dfdb'}`)

function updateElapsed(newVal) {
	emit('update', { ...props.task, elapsed: newVal })
}
</script>

<template>
	<div class="rounded-xl flex justify-between shadow p-4" :style="cardStyle">
		<div class="flex items-start gap-4 flex-1 min-w-0">
			<div
				class="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shadow shrink-0"
			>
				<component :is="task.icon" class="h-6 w-6 text-gray-900" />
			</div>

			<div class="min-w-0 flex-1">
				<h2 class="text-xl font-semibold text-black truncate">{{ task.title }}</h2>
				<p class="text-black/90 text-sm mt-1 line-clamp-2">{{ task.description }}</p>
				<div class="text-xs text-black/70 mt-2 italic truncate">#{{ task.category }}</div>
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
