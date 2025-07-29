<script setup>
import { computed } from 'vue'
import { PRIMARY_BUTTON, TEXT_BUTTON_CONTENT } from '../../constans'
import { isButtonTypeValid, isButtonContentTypeValid } from '../../validators'

const props = defineProps({
	variant: {
		type: String,
		default: PRIMARY_BUTTON,
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
		default: 'bg-teal-600 hover:bg-teal-400',
		primary: 'bg-indigo-300 hover:bg-indigo-400',
		danger: 'bg-red-300 hover:bg-red-400',
		success: 'bg-green-300 hover:bg-green-400',
	}
	return `${base} ${variants[props.variant] || variants.primary}`
	
})
</script>

<template>
	<button :class="variantClasses">
		<div
			v-if="props.contentType === 'icon'"
			class="h-8 w-8 text-gray-400 group-hover:text-white"
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
