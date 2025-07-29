<script setup>
import { computed, ref } from 'vue'
import { isSameDay, addDays } from 'date-fns'
import { label } from '../functions'

const props = defineProps({
	selectedDate: {
		type: Date,
		required: true,
	}
})

const emit = defineEmits(['update:day'])

function btnClass(date) {
	const base =
		'w-full h-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 rounded-lg text-xl'
	return isSameDay(date, localSelectedDate.value)
		? base + ' bg-teal-600 text-white shadow-inner'
		: base + ' bg-gray-300 text-gray-700 hover:bg-gray-400'
}
const localSelectedDate = ref(props.selectedDate)

const prevDate = computed(() => addDays(localSelectedDate.value, -1))
const nextDate = computed(() => addDays(localSelectedDate.value, 1))

function setDate(date) {
	localSelectedDate.value = date
	emit('update:day', date)
}

</script>

<template>
	<div class="fixed bottom-2 h-16 flex z-50 gap-2" :style="{ left: '250px', right: '30px' }">
		<button @click="setDate(prevDate)" :class="btnClass(prevDate)">
			{{ label(prevDate) }}
		</button>
		<button @click="setDate(localSelectedDate)" :class="btnClass(localSelectedDate)">
			{{ label(localSelectedDate) }}
		</button>
		<button @click="setDate(nextDate)" :class="btnClass(nextDate)">
			{{ label(nextDate) }}
		</button>
	</div>
</template>
