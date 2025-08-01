<script setup>
import { defineProps, defineEmits } from 'vue'
import TaskCard from './TaskCard.vue'
import BaseButton from './UI/BaseButton.vue'
import { DEFAULT_BUTTON } from '../constans'

const props = defineProps({
	tasks: Array,
})

const emit = defineEmits(['create', 'edit', 'delete', 'start', 'stop'])
</script>

<template>
	<div class="col-span-2 bg-gradient-to-br from-gray-100 to-blue-50 rounded-2xl shadow-xl shadow-gray-300 p-4">
		<div class="flex justify-end mb-4">
			<BaseButton :variant="DEFAULT_BUTTON" @click="emit('create')">
				Создать задачу
			</BaseButton>
		</div>
		<div class="flex flex-col gap-6">
			<TaskCard
				v-for="task in tasks"
				:key="task.id"
				:task="task"
				@edit="emit('edit', task)"
				@start="$emit('start', $event)"
  				@stop="$emit('stop', $event)"
			/>
		</div>
	</div>
</template>
