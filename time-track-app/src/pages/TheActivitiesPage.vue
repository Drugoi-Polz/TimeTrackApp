<script setup>
import { defineProps } from 'vue'
import { formatTime, formatTimestamp } from '../functions'
import ThePageTitle from '../components/UI/ThePageTitle.vue'
import ActivityItem from '../components/ActivityItem.vue'

const props = defineProps({
	activities: {
		type: Array,
		default: () => [],
	},
})
</script>

<template>
	<div class="p-8 bg-gray-100 min-h-screen">

		<ThePageTitle>Активности</ThePageTitle>

		<div v-if="activities.length" class="space-y-6">
			<ActivityItem v-for="act in activities" :key="act.id" :activity="act" />
		</div>
		<div v-else class="text-gray-500">Нет завершённых активностей.</div>
	</div>
</template>
