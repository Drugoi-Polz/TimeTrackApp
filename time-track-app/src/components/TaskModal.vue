<script setup>
import { ref, watch } from 'vue'
import { isTaskValid } from '../validators'
import { DEFAULT_BUTTON, PRIMARY_BUTTON } from '../constans'
import { iconOptions } from '../iconsList'

import BaseButton from './UI/BaseButton.vue'
import SuggestInput from './UI/SuggestInput.vue'
import BaseInput from './UI/BaseInput.vue'
import ThePageTitle from './UI/ThePageTitle.vue'
import IconsList from './UI/IconsList.vue'

const props = defineProps({
	categorySuggestions: {
		type: Array,
		default: () => [],
	},
	task: {
		type: Object,
		default: null,
	},
})

const emit = defineEmits(['save', 'close'])

const title = ref('')
const description = ref('')
const category = ref('')
const color = ref('#38bdf8')
const iconName = ref('')

const showSuggestions = ref(false)

watch(
	() => props.task,
	(task) => {
		if (task) {
			title.value = task.title
			description.value = task.description
			category.value = task.category
			color.value = task.color
			iconName.value = task.iconName
		}
	},
	{ immediate: true }
)

function handleSave() {
	const target = props.task ? props.task : {}

	if (!target.id) {
		target.id = Date.now()
	}

	target.title = title.value
	target.description = description.value
	target.category = category.value
	target.color = color.value
	target.iconName = iconName.value
	target.icon = iconOptions[iconName.value]

	if (isTaskValid(target)) {
		if (!props.categorySuggestions.includes(category.value)) {
			props.categorySuggestions.push(category.value)
		}
		emit('save', target)
		reset()
	}
}

function reset() {
	title.value = ''
	description.value = ''
	category.value = ''
	color.value = '#38bdf8'
	iconName.value = ''
	showSuggestions.value = false
	emit('close')
}
</script>

<template>
	<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
		<div class="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
			<ThePageTitle> Новая задача </ThePageTitle>

			<BaseInput v-model="title" placeholder="Название" />

			<BaseInput v-model="description" placeholder="Описание" />

			<SuggestInput
				v-model="category"
				placeholder="Категория"
				:suggestions="categorySuggestions"
				@select="category = $event"
			/>

			<div class="flex items-center gap-4">
				<label class="text-xl text-gray-600">Цвет:</label>
				<input type="color" v-model="color" class="w-full rounded-2xl h-12" />
			</div>

			<IconsList v-model="iconName"> </IconsList>

			<div class="flex justify-end gap-2">
				<BaseButton @click="reset" :variant="PRIMARY_BUTTON" >Отмена</BaseButton>
				<BaseButton :variant="DEFAULT_BUTTON" @click="handleSave">Сохранить</BaseButton>
			</div>
		</div>
	</div>
</template>