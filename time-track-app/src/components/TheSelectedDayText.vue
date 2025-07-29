<script setup>
import { label } from '../functions'

const props = defineProps({
	selectedDate: {
		type: Date,
		required: true,
	}
})
</script>

<template>
	<div class="mb-8 text-gray-600 text-xl">
		Выбранная дата: <span class="font-bold">{{ label(selectedDate) }}</span>
	</div>
</template>
