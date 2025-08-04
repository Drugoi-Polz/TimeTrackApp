<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { PlayIcon } from '@heroicons/vue/24/outline'
import { StopIcon } from '@heroicons/vue/24/solid'
import { ICON_BUTTON_CONTENT, MAX_TIMER_SECONDS, STORAGE_KEYS } from '../../constans'
import { formatTime } from '../../functions/timeFunctions'

import BaseButton from '../UI/BaseButton.vue'

const props = defineProps({
	initial: {
		type: Number,
		default: 0,
	},
	taskId: {
		type: [String, Number],
		required: true,
	},
})
const emit = defineEmits(['start', 'stop'])

const isRunning = ref(false)
const elapsed = ref(props.initial)
let timerId = null
let startTime = null

function readStore() {
	return JSON.parse(localStorage.getItem(STORAGE_KEYS['activeTasks']) || '{}')
}
function writeStore(store) {
	localStorage.setItem(STORAGE_KEYS['activeTasks'], JSON.stringify(store))
}

function start() {
	if (timerId) return
	isRunning.value = true
	startTime = Date.now()
	const store = readStore()
	store[props.taskId] = startTime
	writeStore(store)
	emit('start', startTime)
	timerId = setInterval(() => elapsed.value++, 1000)
}

function stop() {
	if (!timerId) return
	isRunning.value = false
	clearInterval(timerId)
	timerId = null
	const endTime = Date.now()
	emit('stop', {
		start: startTime,
		end: endTime,
		duration: elapsed.value,
	})

	const store = readStore()
	delete store[props.taskId]
	writeStore(store)

	elapsed.value = 0
}

function toggle() {
	isRunning.value ? stop() : start()
}

onMounted(() => {
	const store = readStore()
	const savedStart = store[props.taskId]
	if (savedStart) {
		let sec = Math.floor((Date.now() - savedStart) / 1000)
		if (sec > MAX_TIMER_SECONDS) {
			delete store[props.taskId]
			writeStore(store)
			return
		}
		isRunning.value = true
		startTime = savedStart
		elapsed.value = sec
		timerId = setInterval(() => elapsed.value++, 1000)
	}
})

onBeforeUnmount(() => {
	if (timerId) clearInterval(timerId)
})
</script>

<template>
	<div class="flex items-center gap-2">
		<div class="font-semibold text-2xl text-gray-600 w-min-100 w-35 shrink-0 text-center p-2">
			{{ isRunning ? formatTime(elapsed) : '' }}
		</div>

		<BaseButton
			:contentType="ICON_BUTTON_CONTENT"
			:class="isRunning ? 'text-red-400' : ''"
			@click="toggle"
		>
			<component :is="isRunning ? StopIcon : PlayIcon" />
		</BaseButton>
	</div>
</template>
