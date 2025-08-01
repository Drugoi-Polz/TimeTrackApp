<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { PlayIcon, StopIcon } from '@heroicons/vue/24/outline'
import BaseButton from './UI/BaseButton.vue'
import { DANGER_BUTTON, SUCCESS_BUTTON, ICON_BUTTON_CONTENT, MAX_TIMER_SECONDS } from '../constans'

const props = defineProps({
	initial: { type: Number, default: 0 },
	taskId: { type: [String, Number], required: true },
})
const emit = defineEmits(['start', 'stop'])

let startTime = null
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
	if (timerId) return
	isRunning.value = true
	startTime = Date.now()

	localStorage.setItem(
		'activeTask',
		JSON.stringify({
			taskId: props.taskId,
			startTime,
		})
	)

	emit('start', startTime)
	timerId = setInterval(() => elapsed.value++, 1000)
}

function stop() {
	if (!timerId) return
	isRunning.value = false
	clearInterval(timerId)
	timerId = null

	const endTime = Date.now()
	emit('stop', { start: startTime, end: endTime, duration: elapsed.value })

	localStorage.removeItem('activeTask') // <<< очищаем
	elapsed.value = 0
}

function toggle() {
	isRunning.value ? stop() : start()
}

onBeforeUnmount(() => {
	if (timerId) clearInterval(timerId)
})

onMounted(() => {
	const raw = localStorage.getItem('activeTask')
	if (!raw) return

	const { taskId: activeId, startTime: savedStartTime } = JSON.parse(raw)
	if (activeId !== props.taskId) return

	const now = Date.now()
	let secondsElapsed = Math.floor((now - savedStartTime) / 1000)

	if (secondsElapsed > MAX_TIMER_SECONDS) {
		secondsElapsed = 0
		localStorage.removeItem('activeTask')
		return
	}

	isRunning.value = true
	startTime = savedStartTime
	elapsed.value = secondsElapsed
	timerId = setInterval(() => elapsed.value++, 1000)
})
</script>

<template>
	<div class="flex items-center gap-15">
		<div
			class="font-semibold text-2xl w-min-100 w-35 shrink-0 text-center p-2"
		>
			{{ formatTime(elapsed) }}
		</div>

		<BaseButton
			:contentType="ICON_BUTTON_CONTENT"
			:variant="isRunning ? DANGER_BUTTON : SUCCESS_BUTTON"
			@click="toggle"
		>
			<component :is="isRunning ? StopIcon : PlayIcon" />
		</BaseButton>
	</div>
</template>
