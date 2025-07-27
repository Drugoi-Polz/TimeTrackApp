<script setup>
import BaseButton from './BaseButton.vue'
import { DANGER_BUTTON, PRIMARY_BUTTON } from '../../constans'

const props = defineProps({
	title: String,
	message: String,
	confirmText: {
		type: String,
		default: 'Удалить',
	},
	cancelText: {
		type: String,
		default: 'Отмена',
	},
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
	<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
		<div class="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4">
			<h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
			<p class="text-gray-600">{{ message }}</p>
			<div class="flex justify-end gap-2 pt-4">
				<BaseButton :variant="PRIMARY_BUTTON" @click="$emit('cancel')">
					{{ cancelText }}
				</BaseButton>
				<BaseButton :variant="DANGER_BUTTON" @click="$emit('confirm')">
					{{ confirmText }}
				</BaseButton>
			</div>
		</div>
	</div>
</template>
