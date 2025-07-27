<script setup>
import { ref } from 'vue'
import BaseInput from './UI/BaseInput.vue'
import BaseButton from './UI/BaseButton.vue'
import ThePageTitle from './UI/ThePageTitle.vue'
import IconsList from './UI/IconsList.vue'
import { DEFAULT_BUTTON } from '../constans'
import { iconOptions } from '../iconsList'
import { isTemplateValid } from '../validators'

const emit = defineEmits(['save', 'close'])

const category = ref('')
const color = ref('#f59e0b')
const iconName = ref('')

function reset() {
	category.value = ''
	color.value = '#f59e0b'
	iconName.value = ''
	emit('close')
}

function handleSave() {
	const newTemplate = {
        id: Date.now(),
		category: category.value,
		color: color.value,
		iconName: iconName.value,
		icon: iconOptions[iconName.value],
	}
	if (isTemplateValid(newTemplate)) {
		emit('save', newTemplate)
		reset()
	}
}
</script>

<template>
	<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
		<div class="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
			<ThePageTitle>Новый шаблон</ThePageTitle>

			<BaseInput v-model="category" placeholder="Название категории" />

			<div class="flex items-center gap-4">
				<label class="text-xl text-gray-600">Цвет:</label>
				<input type="color" v-model="color" class="w-full rounded-2xl h-12" />
			</div>

			<IconsList v-model="iconName" />

			<div class="flex justify-end gap-2">
				<BaseButton @click="reset">Отмена</BaseButton>
				<BaseButton :variant="DEFAULT_BUTTON" @click="handleSave">Сохранить</BaseButton>
			</div>
		</div>
	</div>
</template>
