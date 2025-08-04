<script setup>
import { ref, computed } from 'vue'
import { startOfDay } from 'date-fns'
import { getActivitiesForDate } from '../../functions/timeFunctions'
import { STATISTICS_MODES } from '../../constans'

import ThePageTitle from '../UI/ThePageTitle.vue'
import TheDaySwitch from '../UI/TheDaySwitch.vue'
import IconTextButton from '../UI/IconTextButton.vue'
import TheListStatistics from '../statistics/TheListStatistics.vue'
import PieCharts from '../statistics/charts/PieCharts.vue'
import BarChart from '../statistics/charts/BarChart.vue'
import DoubleText from '../UI/DoubleText.vue'
import EmptyDataMessage from '../UI/EmptyDataMessage.vue'

const props = defineProps({
	activities: Array,
})

const todayDate = startOfDay(new Date())
const selectedDate = ref(todayDate)

const viewMode = ref('list')

const setDate = (date) => {
	selectedDate.value = date
}

const dailyActivities = computed(() => getActivitiesForDate(props.activities, selectedDate.value))

const currentView = computed(() => {
	if (!dailyActivities.value.length) return EmptyDataMessage

	if (viewMode.value === 'list') return TheListStatistics
	if (viewMode.value === 'pie') return PieCharts
	if (viewMode.value === 'line') return BarChart

	return EmptyDataMessage
})
</script>

<template>
	<div class="bg-gray-100 min-h-screen relative">
		<div class="max-w-7xl mx-auto p-6 lg:p-8">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<ThePageTitle>Статистика</ThePageTitle>
				<DoubleText
					label="Выбранная дата"
					:value="selectedDate.toLocaleDateString()"
					class="mt-4 sm:mt-0"
				/>
			</div>

			<div class="mt-6 flex gap-3">
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

			<div class="mt-8">
				<transition name="fade" mode="out-in">
					<component
						:is="currentView"
						:activities="dailyActivities"
						:data="dailyActivities"
						key="view-mode"
					/>
				</transition>
			</div>

			<div class="mt-10">
				<TheDaySwitch
					@update:day="setDate"
					:selectedDate="selectedDate"
					:todayDate="todayDate"
				/>
			</div>
		</div>
	</div>
</template>
