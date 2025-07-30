<script setup>
import { ref, computed } from 'vue'
import { startOfDay } from 'date-fns'
import { getActivitiesForDate, summarizeByTask } from '../functions'
import { STATISTICS_MODES } from '../constans'

import ThePageTitle from '../components/UI/ThePageTitle.vue'
import TheDaySwitch from '../components/TheDaySwitch.vue'
import TheSelectedDayText from '../components/TheSelectedDayText.vue'
import IconTextButton from '../components/UI/IconTextButton.vue'
import TheListStatistics from '../components/TheListStatistics.vue'
import PieCharts from '../components/charts/PieCharts.vue'
import BarChart from '../components/charts/BarChart.vue'

const props = defineProps({
	activities: {
		type: Array,
		required: true,
	},
})

const todayDate = startOfDay(new Date())
const selectedDate = ref(todayDate)

const viewMode = ref('list')

const setDate = (date) => {
	selectedDate.value = date
}

const dailyActivities = computed(() => getActivitiesForDate(props.activities, selectedDate.value))

const summary = computed(() => summarizeByTask(dailyActivities.value))
</script>

<template>
	<div class="relative bg-gray-100 min-h-screen p-8 pb-24">
		<ThePageTitle>Статистика</ThePageTitle>
		<TheSelectedDayText :selectedDate="selectedDate" />

		<div class="mt-10 flex items-center justify-around gap-4 mx-40">
			<IconTextButton
				v-for="mode in STATISTICS_MODES"
				:key="mode.key"
				:text="mode.label"
				:icon="mode.icon"
				:modeKey="mode.key"
				:activeMode="viewMode"
				@click="viewMode = mode.key"
			/>
		</div>

		<TheListStatistics v-show="viewMode == 'list'" :activities="dailyActivities" />
		<div v-show="viewMode === 'pie'" class="mx-150 mt-20">
            <PieCharts :data="dailyActivities" />
        </div>
		<div v-show="viewMode === 'line'" class="mx-150 mt-20">
            <BarChart :data="dailyActivities" />
        </div>

		<TheDaySwitch @update:day="setDate" :selectedDate="selectedDate" :todayDate="todayDate" />
	</div>
</template>
