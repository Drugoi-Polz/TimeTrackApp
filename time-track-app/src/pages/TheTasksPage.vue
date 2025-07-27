<script setup>
import { ref } from 'vue'
import TaskCard from '../components/TaskCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'
import ThePageTitle from '../components/UI/ThePageTitle.vue'
import { DEFAULT_BUTTON } from '../constans'
import TaskModal from '../components/TaskModal.vue'
import ConfirmModal from '../components/UI/ConfirmModal.vue'
import TaskTemplateCard from '../components/TaskTemplateCard.vue'
import TemplateModal from '../components/TemplateModal.vue'

const showTaskModal = ref(false)
const taskToEdit = ref(null)

function handleSave(task) {
	const isEditing = tasks.value.some((t) => t.id === task.id)

	if (!isEditing) {
		tasks.value.push(task)
	}

	showTaskModal.value = false
	taskToEdit.value = null
}

function requestDeleteTask(task) {
	taskToDelete.value = task
	showConfirmTask.value = true
}

function requestDeleteTemplate(template) {
	templateToDelete.value = template
	showConfirmTemplate.value = true
}

function confirmDeleteTask() {
	tasks.value = tasks.value.filter((t) => t.id !== taskToDelete.value.id)
	taskToDelete.value = null
	showConfirmTask.value = false
}

function confirmDeleteTemplate() {
	taskTemplates.value = taskTemplates.value.filter((t) => t.id !== templateToDelete.value.id)
	templateToDelete.value = null
	showConfirmTemplate.value = false
}

function cancelDeleteTask() {
	taskToDelete.value = null
	showConfirmTask.value = false
}

function cancelDeleteTemplate() {
	templateToDelete.value = null
	showConfirmTemplate.value = false
}

function handleEdit(task) {
	taskToEdit.value = task
	showTaskModal.value = true
}

const tasks = ref([])
const categorySuggestions = ref([])

const showConfirmTask = ref(false)
const showConfirmTemplate = ref(false)
const taskToDelete = ref(null)
const templateToDelete = ref(null)

const showTemplateModal = ref(false)
const taskTemplates = ref([])

function handleSaveTemplate(template) {
	taskTemplates.value.push(template)
	showTemplateModal.value = false
}
</script>

<template>
	<div class="p-8 min-h-screen flex flex-col bg-gray-100">
		<ThePageTitle>Задачи</ThePageTitle>
		<div class="grid grid-cols-3 gap-8 flex-1">
			<div class="col-span-2 bg-white rounded-2xl shadow-xl shadow-gray-300 p-4">
				<div class="flex justify-end mb-4">
					<BaseButton
						:variant="DEFAULT_BUTTON"
						@click="
							() => {
								showTaskModal = true
								taskToEdit = null
							}
						"
					>
						Создать задачу
					</BaseButton>
				</div>
				<div class="flex flex-col gap-4">
					<TaskCard
						v-for="task in tasks"
						:key="task.id"
						:task="task"
						@edit="handleEdit"
						@delete="requestDeleteTask"
					/>
				</div>
			</div>

			<div class="col-span-1 bg-white rounded-2xl shadow-xl shadow-gray-300 p-4">
				<div class="flex justify-end mb-4">
					<BaseButton :variant="DEFAULT_BUTTON" @click="showTemplateModal = true">
						Создать шаблон
					</BaseButton>
				</div>
				<div class="flex flex-col gap-3 mt-2">
					<TaskTemplateCard
						v-for="template in taskTemplates"
						:key="template.id"
						:template="template"
						@delete="requestDeleteTemplate"
						@click="
							() => {
								taskToEdit = {
									category: template.category,
									color: template.color,
									iconName: template.iconName,
									icon: template.icon,
								}
								showTaskModal = true
							}
						"
					/>
				</div>
			</div>
		</div>
		<TemplateModal
			v-if="showTemplateModal"
			@save="handleSaveTemplate"
			@close="showTemplateModal = false"
		/>
		<TaskModal
			v-if="showTaskModal"
			:categorySuggestions="categorySuggestions"
			:task="taskToEdit"
			@save="handleSave"
			@close="
				() => {
					showTaskModal = false
					taskToEdit = null
				}
			"
		/>
		<ConfirmModal
			v-if="showConfirmTask"
			title="Удалить задачу?"
			message="Вы уверены, что хотите удалить эту задачу? Это действие необратимо."
			@confirm="confirmDeleteTask"
			@cancel="cancelDeleteTask"
		/>
		<ConfirmModal
			v-if="showConfirmTemplate"
			title="Удалить шаблон?"
			message="Вы уверены, что хотите удалить этот шаблон? Это действие необратимо."
			@confirm="confirmDeleteTemplate"
			@cancel="cancelDeleteTemplate"
		/>
	</div>
</template>
