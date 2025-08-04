<script setup>
import { ref, computed } from 'vue'
import { getActivitiesForDate } from '../../functions/timeFunctions'
import { startOfDay } from 'date-fns'

import ThePageTitle from '../UI/ThePageTitle.vue'
import ActivityItem from '../activities/ActivityItem.vue'
import TheDaySwitch from '../UI/TheDaySwitch.vue'
import DoubleText from '../UI/DoubleText.vue'
import EmptyDataMessage from '../UI/EmptyDataMessage.vue'

const props = defineProps({
	activities: {
		type: Array,
		required: true,
	},
})

const todayDate = startOfDay(new Date())
const selectedDate = ref(todayDate)

function setDate(date) {
	selectedDate.value = date
}

const filteredActivities = computed(() =>
	getActivitiesForDate(props.activities, selectedDate.value)
)
</script>

<template>
	<div class="relative bg-gray-100 min-h-screen p-8 pb-24">
		<ThePageTitle>Активности</ThePageTitle>
		<DoubleText
			:label="'Выбранная дата'"
			:value="selectedDate.toLocaleDateString()"
			class="mb-4"
		/>
		<div v-if="filteredActivities.length" class="space-y-6">
			<ActivityItem v-for="act in filteredActivities" :key="act.id" :activity="act" />
		</div>
		<div v-else key="empty">
			<EmptyDataMessage />
		</div>
		<TheDaySwitch @update:day="setDate" :selectedDate="selectedDate" />
	</div>
</template>
