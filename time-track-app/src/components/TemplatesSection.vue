<script setup>
import { defineProps, defineEmits } from 'vue'
import TaskTemplateCard from './TaskTemplateCard.vue'
import BaseButton from './UI/BaseButton.vue'
import { DEFAULT_BUTTON } from '../constans'

const props = defineProps({
	templates: Array,
})

const emit = defineEmits(['create', 'delete', 'use'])
</script>

<template>
	<div class="col-span-1 bg-white rounded-2xl shadow-xl shadow-gray-300 p-4">
		<div class="flex justify-end mb-4">
			<BaseButton :variant="DEFAULT_BUTTON" @click="emit('create')">
				Создать шаблон
			</BaseButton>
		</div>
		<div class="flex flex-col gap-3 mt-2">
			<TaskTemplateCard
				v-for="template in templates"
				:key="template.id"
				:template="template"
				@delete="emit('delete', template)"
				@click="emit('use', template)"
			/>
		</div>
	</div>
</template>
