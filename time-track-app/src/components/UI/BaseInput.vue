<script setup>
import { computed } from 'vue'

const props = defineProps({
	placeholder: {
		type: String,
		default: '',
	},
	modelValue: {
		type: [String, Number],
		default: '',
	},
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const model = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
})
</script>

<template>
	<input
		class="w-full p-2 border rounded"
		:placeholder="placeholder"
		type="text"
		v-model="model"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
	/>
</template>
