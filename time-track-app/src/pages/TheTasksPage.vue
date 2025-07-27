<script setup>
import { ref } from 'vue'
import TaskCard from '../components/TaskCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'
import ThePageTitle from '../components/UI/ThePageTitle.vue'
import { DEFAULT_BUTTON } from '../constans'
import TaskModal from '../components/TaskModal.vue'
import ConfirmModal from '../components/UI/ConfirmModal.vue'

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

function requestDelete(task) {
	taskToDelete.value = task
	showConfirm.value = true
}

function confirmDelete() {
	tasks.value = tasks.value.filter((t) => t.id !== taskToDelete.value.id)
	taskToDelete.value = null
	showConfirm.value = false
}

function cancelDelete() {
	taskToDelete.value = null
	showConfirm.value = false
}

function handleEdit(task) {
	taskToEdit.value = task
	showTaskModal.value = true
}

const tasks = ref([])
const categorySuggestions = ref([])

const showConfirm = ref(false)
const taskToDelete = ref(null)
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
						@delete="requestDelete"
					/>
				</div>
			</div>

			<div class="col-span-1 bg-white rounded-2xl shadow-xl shadow-gray-300 p-4">
				<div class="flex justify-end mb-4">
					<BaseButton :variant="DEFAULT_BUTTON"> Создать шаблон </BaseButton>
				</div>

			</div>
		</div>
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
			v-if="showConfirm"
			title="Удалить задачу?"
			message="Вы уверены, что хотите удалить эту задачу? Это действие необратимо."
			@confirm="confirmDelete"
			@cancel="cancelDelete"
		/>
	</div>
</template>
