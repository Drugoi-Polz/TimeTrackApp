import { ref } from 'vue'

export function useDeleteConfirmation(collections) {
	const itemToDelete = ref(null)
	const deleteType = ref('')
	const showConfirm = ref(false)

	function requestDelete(item, type) {
		itemToDelete.value = item
		deleteType.value = type
		showConfirm.value = true
	}

	function confirmDelete() {
		const collection = collections[deleteType.value]
		if (collection && itemToDelete.value) {
			collection.value = collection.value.filter((i) => i.id !== itemToDelete.value.id)
		}
		cancelDelete()
	}

	function cancelDelete() {
		itemToDelete.value = null
		deleteType.value = ''
		showConfirm.value = false
	}

	return {
		showConfirm,
		requestDelete,
		confirmDelete,
		cancelDelete,
		deleteType,
	}
}
