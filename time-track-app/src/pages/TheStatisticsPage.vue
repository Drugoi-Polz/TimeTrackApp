<script setup>
import { ref, computed } from 'vue'
import { startOfDay } from 'date-fns'
import { getActivitiesForDate } from '../functions'
import { STATISTICS_MODES } from '../constans'

import ThePageTitle from '../components/UI/ThePageTitle.vue'
import TheDaySwitch from '../components/TheDaySwitch.vue'
import IconTextButton from '../components/UI/IconTextButton.vue'
import TheListStatistics from '../components/TheListStatistics.vue'
import PieCharts from '../components/charts/PieCharts.vue'
import BarChart from '../components/charts/BarChart.vue'
import DoubleText from '../components/UI/DoubleText.vue'
import EmptyDataMessage from '../components/EmptyDataMessage.vue'

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
</script>

<template>
	<div class="bg-gray-100 min-h-screen">
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
					<TheListStatistics
						v-if="viewMode === 'list' && dailyActivities.length"
						:activities="dailyActivities"
						key="list"
					/>

					<div
						v-else-if="viewMode === 'pie' && dailyActivities.length"
						class="grid justify-center"
						key="pie"
					>
						<PieCharts :data="dailyActivities" />
					</div>

					<div
						v-else-if="viewMode === 'line' && dailyActivities.length"
						class="grid justify-center"
						key="bar"
					>
						<BarChart :data="dailyActivities" />
					</div>

					<div v-else key="empty">
						<EmptyDataMessage />
					</div>
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
