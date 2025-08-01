<script setup>
import { computed } from 'vue'
import { SUCCESS_BUTTON, TEXT_BUTTON_CONTENT } from '../../constans'
import { isButtonTypeValid, isButtonContentTypeValid } from '../../validators'

const props = defineProps({
	variant: {
		type: String,
		default: SUCCESS_BUTTON,
		validator: isButtonTypeValid
	},
	contentType: {
		type: String,
		default: TEXT_BUTTON_CONTENT,
		validator: isButtonContentTypeValid
	},
})

const variantClasses = computed(() => {
	const base = 'group flex items-center justify-center p-2 rounded transition-colors'
	const variants = {
		default: 'bg-teal-600 hover:bg-teal-700',
		primary: 'bg-indigo-300 hover:bg-indigo-400 text-gray-400',
		danger: 'bg-red-300 hover:bg-red-400 text-gray-400',
		success: 'text-gray-600 bg-white hover:bg-gray-400 rounded-2xl',
	}
	return `${base} ${variants[props.variant] || variants.primary}`
	
})
</script>

<template>
	<button :class="variantClasses">
		<div
			v-if="props.contentType === 'icon'"
			class="h-8 w-8 group-hover:text-teal-600"
		>
			<slot></slot>
		</div>

		<div
			v-if="props.contentType === 'text'"
			class="text-white px-2 py-1"
		>
			<slot></slot>
		</div>
	</button>
</template>
