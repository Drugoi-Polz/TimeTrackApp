<script setup>
import { defineProps, defineEmits } from 'vue'
import { SUCCESS_BUTTON } from '../constans'
import TaskTemplateCard from './TaskTemplateCard.vue'
import BaseButton from './UI/BaseButton.vue'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
	templates: { type: Array, default: () => [] },
})
const emit = defineEmits(['create', 'delete', 'use'])
</script>

<template>
	<div class="col-span-1 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 flex flex-col">

		<div class="flex justify-end mb-4 flex-none">
			<BaseButton :variant="SUCCESS_BUTTON" @click="emit('create')">
				Создать шаблон
			</BaseButton>
		</div>

		<div
			class="flex-1 flex flex-col"
			:class="
				templates.length ? 'justify-start items-stretch' : 'justify-center items-center'
			"
		>
			<div v-if="templates.length" class="w-full flex flex-col gap-6">
				<TaskTemplateCard
					v-for="template in templates"
					:key="template.id"
					:template="template"
					@delete="emit('delete', template)"
					@click="emit('use', template)"
				/>
			</div>

			<div v-else class="flex flex-col items-center space-y-4 text-gray-500">
				<ArrowTopRightOnSquareIcon class="w-16 h-16 text-gray-300" />
				<p class="text-xl font-medium">Создайте новый шаблон</p>
			</div>
		</div>
	</div>
</template>
