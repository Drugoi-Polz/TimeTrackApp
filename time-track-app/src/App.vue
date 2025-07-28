<script setup>
import Sidebar from './components/TheSideBar.vue'
import { usePersistentState } from './composables/usePersistentState'
import { STORAGE_KEYS } from './constans'

const activities = usePersistentState(STORAGE_KEYS['activities'])

function onTaskStart(task) {
	const existing = activities.value.find((a) => a.id === task.id)
	if (!existing) {
		activities.value.push({ ...task, intervals: [] })
	}
}

function onTaskStop({ task, interval }) {
	const act = activities.value.find((a) => a.id === task.id)
	if (act) {
		act.intervals.push(interval)
	}
}
</script>

<template>
	<div class="flex h-screen">
		<Sidebar />
		<main class="flex-1 overflow-auto">
			<router-view @start="onTaskStart" @stop="onTaskStop" :activities="activities" />
		</main>
	</div>
</template>
