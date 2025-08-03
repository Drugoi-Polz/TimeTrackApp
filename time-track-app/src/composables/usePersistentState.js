import { ref, watch, onMounted } from 'vue'
import { iconOptions } from '../iconsList'

export function usePersistentState(key, defaultValue = []) {
	const state = ref(defaultValue)

	onMounted(() => {
		const saved = localStorage.getItem(key)
		if (saved !== null) {
			try {
				const parsed = JSON.parse(saved)

				if (Array.isArray(parsed)) {
					parsed.forEach((item) => {
						if (item.iconName && iconOptions[item.iconName]) {
							item.icon = iconOptions[item.iconName]
						}
					})
				}

				state.value = parsed
			} catch (e) {
				console.warn(`Ошибка при разборе localStorage по ключу "${key}":`, e)
			}
		}
	})

	watch(state, (newVal) => {
		const toSave = JSON.stringify(
			newVal.map((item) => {
				const copy = { ...item }
				delete copy.icon
				return copy
			})
		)
		localStorage.setItem(key, toSave)
	}, { deep: true })

	return state
}
