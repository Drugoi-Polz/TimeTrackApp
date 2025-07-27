<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseButton from './UI/BaseButton.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { DANGER_BUTTON, ICON_BUTTON_CONTENT } from '../constans'
import { isTemplateValid } from '../validators'

const props = defineProps({
	template: {
		type: Object,
		required: true,
		validator: isTemplateValid,
	},
})

const emit = defineEmits(['delete'])
</script>

<template>
	<div
		class="flex items-center justify-between p-3 rounded-xl shadow cursor-pointer"
		:style="{ backgroundColor: template.color || '#f3f4f6' }"
	>
		<div class="flex items-center gap-3 flex-1 min-w-0">
			<div class="bg-white rounded-full p-1 shadow shrink-0">
				<component :is="template.icon" class="w-6 h-6 text-gray-700" />
			</div>
			<span class="text-md font-medium text-white truncate">
				{{ template.category }}
			</span>
		</div>

		<BaseButton
			:variant="DANGER_BUTTON"
			:contentType="ICON_BUTTON_CONTENT"
			@click.stop="emit('delete', template)"
		>
			<TrashIcon />
		</BaseButton>
	</div>
</template>

