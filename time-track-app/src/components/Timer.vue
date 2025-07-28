<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { PlayIcon, StopIcon } from '@heroicons/vue/24/outline'
import BaseButton from './UI/BaseButton.vue'
import { DANGER_BUTTON, SUCCESS_BUTTON, ICON_BUTTON_CONTENT } from '../constans'

const props = defineProps({
	initial: { type: Number, default: 0 },
})
const emit = defineEmits(['update'])

const isRunning = ref(false)
const elapsed = ref(props.initial)
let timerId = null

function formatTime(sec) {
	const h = Math.floor(sec / 3600)
		.toString()
		.padStart(2, '0')
	const m = Math.floor((sec % 3600) / 60)
		.toString()
		.padStart(2, '0')
	const s = (sec % 60).toString().padStart(2, '0')
	return `${h}:${m}:${s}`
}

function start() {
	if (timerId) 
        return

	isRunning.value = true
	timerId = setInterval(() => elapsed.value++, 1000)
}
function stop() {
	if (!timerId) 
        return

	isRunning.value = false
	clearInterval(timerId)
	timerId = null
	emit('update', elapsed.value)
}
function toggle() {
	isRunning.value ? stop() : start()
}

onBeforeUnmount(() => {
	if (timerId) clearInterval(timerId)
})
</script>

<template>
	<div class="flex items-center gap-15">
        
		<div class="font-semibold text-2xl w-min-100 w-35 shrink-0 text-center bg-gray-200 p-2 rounded">{{ formatTime(elapsed) }}</div>
		
        <BaseButton
			:contentType="ICON_BUTTON_CONTENT"
			:variant="isRunning ? DANGER_BUTTON : SUCCESS_BUTTON"
			@click="toggle"
		>
			<component :is="isRunning ? StopIcon : PlayIcon"/>
		</BaseButton>
	</div>
</template>
