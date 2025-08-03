<script setup>
import { defineProps, defineEmits } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { DEFAULT_BUTTON, ICON_BUTTON_CONTENT } from '../constans'
import { isTemplateValid } from '../validators'

import BaseButton from './UI/BaseButton.vue'

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
		class="flex items-center justify-between p-3 rounded-xl shadow cursor-pointer bg-white"
	>
		<div class="flex items-center gap-3 flex-1 min-w-0">
			<div
				class="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-inner"
				:style="{ backgroundColor: template.color }"
			>
				<component :is="template.icon" class="h-6 w-6 text-white" />
			</div>
			<h2
					class="text-2xl font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200"
				>
					{{ template.category }}
				</h2>
		</div>

		<BaseButton
			:variant="DEFAULT_BUTTON"
			:contentType="ICON_BUTTON_CONTENT"
			@click.stop="emit('delete', template)"
		>
			<TrashIcon />
		</BaseButton>
	</div>
</template>

