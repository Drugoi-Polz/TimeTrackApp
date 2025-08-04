<script setup>
import { ref } from 'vue'
import { useDeleteConfirmation } from '../../composables/useDeleteConfirmation'
import { usePersistentState } from '../../composables/usePersistentState'
import { STORAGE_KEYS } from '../../constans'

import TasksSection from '../tasks/TasksSection.vue'
import TemplatesSection from '../templates/TemplatesSection.vue'
import TaskModal from '../tasks/TaskModal.vue'
import TemplateModal from '../templates/TemplateModal.vue'
import ConfirmModal from '../UI/ConfirmModal.vue'
import ThePageTitle from '../UI/ThePageTitle.vue'

const emit = defineEmits(['start', 'stop'])

const tasks = usePersistentState(STORAGE_KEYS['tasks'])
const taskTemplates = usePersistentState(STORAGE_KEYS['templates'])
const categorySuggestions = usePersistentState(STORAGE_KEYS['categories'])

const showTaskModal = ref(false)
const showTemplateModal = ref(false)
const taskToEdit = ref(null)

const {
	showConfirm: showConfirmDelete,
	requestDelete,
	confirmDelete,
	cancelDelete,
	deleteType,
} = useDeleteConfirmation({ task: tasks, template: taskTemplates })

function handleSave(task) {
	const isEditing = tasks.value.some((t) => t.id === task.id)
	if (!isEditing) tasks.value.push(task)
	showTaskModal.value = false
	taskToEdit.value = null
}

function handleEdit(task) {
	taskToEdit.value = task
	showTaskModal.value = true
}

function handleSaveTemplate(template) {
	taskTemplates.value.push(template)
	showTemplateModal.value = false
}

function useTemplate(template) {
	taskToEdit.value = {
		category: template.category,
		color: template.color,
		iconName: template.iconName,
		icon: template.icon,
	}
	showTaskModal.value = true
}
function updateTasksOrder(updatedTask) {
	emit('start', updatedTask)
	tasks.value = tasks.value.filter((t) => t.id !== updatedTask.id)
	tasks.value.unshift(updatedTask)
}
</script>

<template>
	<div class="p-8 min-h-screen flex flex-col bg-gray-100">
		<ThePageTitle>Задачи</ThePageTitle>

		<div class="grid grid-cols-3 gap-8 flex-1">
			<TasksSection
				:tasks="tasks"
				@create="
					() => {
						showTaskModal = true
						taskToEdit = null
					}
				"
				@edit="handleEdit"
				@delete="(task) => requestDelete(task, 'task')"
				@start="updateTasksOrder"
				@stop="$emit('stop', $event)"
			/>

			<TemplatesSection
				:templates="taskTemplates"
				@create="showTemplateModal = true"
				@delete="(template) => requestDelete(template, 'template')"
				@use="useTemplate"
			/>
		</div>

		<TaskModal
			v-if="showTaskModal"
			:task="taskToEdit"
			:categorySuggestions="categorySuggestions"
			@save="handleSave"
			@close="
				() => {
					showTaskModal = false
					taskToEdit = null
				}
			"
		/>

		<TemplateModal
			v-if="showTemplateModal"
			@save="handleSaveTemplate"
			@close="showTemplateModal = false"
		/>

		<ConfirmModal
			v-if="showConfirmDelete"
			:title="deleteType === 'task' ? 'Удалить задачу?' : 'Удалить шаблон?'"
			:message="
				deleteType === 'task'
					? 'Вы уверены, что хотите удалить эту задачу? Это действие необратимо.'
					: 'Вы уверены, что хотите удалить этот шаблон? Это действие необратимо.'
			"
			@confirm="confirmDelete"
			@cancel="cancelDelete"
		/>
	</div>
</template>
