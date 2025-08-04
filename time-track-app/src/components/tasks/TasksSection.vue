<script setup>
import { defineProps, defineEmits } from 'vue'
import { SUCCESS_BUTTON } from '../../constans'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'

import TaskCard from './TaskCard.vue'
import BaseButton from '../UI/BaseButton.vue'

const props = defineProps({
	tasks: { type: Array, default: () => [] },
})
const emit = defineEmits(['create', 'edit', 'delete', 'start', 'stop'])
</script>

<template>
	<div class="col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 flex flex-col">
		<!-- Заголовок + кнопка -->
		<div class="flex justify-end mb-4 flex-none">
			<BaseButton :variant="SUCCESS_BUTTON" @click="emit('create')">
				Создать задачу
			</BaseButton>
		</div>
		<div
			class="flex-1 flex flex-col"
			:class="tasks.length ? 'justify-start items-stretch' : 'justify-center items-center'"
		>
			<div v-if="tasks.length" class="w-full flex flex-col gap-6">
				<TaskCard
					v-for="task in tasks"
					:key="task.id"
					:task="task"
					@edit="emit('edit', task)"
					@delete="emit('delete', task)"
					@start="$emit('start', $event)"
					@stop="$emit('stop', $event)"
				/>
			</div>

			<div v-else class="flex flex-col items-center space-y-4 text-gray-500">
				<PlusCircleIcon class="w-16 h-16 text-gray-300" />
				<p class="text-xl font-medium">Создайте новую задачу</p>
			</div>
		</div>
	</div>
</template>
