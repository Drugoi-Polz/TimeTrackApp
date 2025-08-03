<script setup>
import { defineProps, defineEmits } from 'vue'
import { SUCCESS_BUTTON } from '../constans'

import TaskCard from './TaskCard.vue'
import BaseButton from './UI/BaseButton.vue'

const props = defineProps({
	tasks: Array,
})

const emit = defineEmits(['create', 'edit', 'delete', 'start', 'stop'])
</script>

<template>
	<div class="col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-300 p-4">
		<div class="flex justify-end mb-4">
			<BaseButton :variant="SUCCESS_BUTTON" @click="emit('create')">
				Создать задачу
			</BaseButton>
		</div>
		<div class="flex flex-col gap-6 mt-6">
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
	</div>
</template>
