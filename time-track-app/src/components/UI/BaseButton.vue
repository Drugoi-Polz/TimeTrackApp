<script>
import { DANGER_BUTTON, DEFAULT_BUTTON, PRIMARY_BUTTON, SUCCESS_BUTTON } from '../../constans'

const variantClasses = {
	[SUCCESS_BUTTON]: 'bg-teal-600 hover:bg-teal-700 opacity-70',
	[PRIMARY_BUTTON]: 'bg-indigo-300 hover:bg-indigo-400 text-gray-400',
	[DANGER_BUTTON]: 'bg-red-300 hover:bg-red-400 text-gray-400',
	[DEFAULT_BUTTON]: 'text-gray-600 bg-white hover:bg-gray-300 rounded-2xl',
}
</script>

<script setup>
import { TEXT_BUTTON_CONTENT } from '../../constans'
import { isButtonTypeValid, isButtonContentTypeValid } from '../../validators'

const props = defineProps({
	variant: {
		type: String,
		default: DEFAULT_BUTTON,
		validator: isButtonTypeValid,
	},
	contentType: {
		type: String,
		default: TEXT_BUTTON_CONTENT,
		validator: isButtonContentTypeValid,
	},
})
</script>

<template>
	<button
		:class="`${variantClasses[variant]} group flex items-center justify-center p-2 rounded transition-colors`"
	>
		<div v-if="props.contentType === 'icon'" class="h-8 w-8 group-hover:text-teal-600">
			<slot></slot>
		</div>

		<div v-if="props.contentType === 'text'" class="text-white px-2 py-1">
			<slot></slot>
		</div>
	</button>
</template>
