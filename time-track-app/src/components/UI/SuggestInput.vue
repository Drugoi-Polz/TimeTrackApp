<!-- src/components/UI/SuggestInput.vue -->
<script setup>
import { ref, computed, watch } from 'vue'
import BaseInput from './BaseInput.vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	suggestions: {
		type: Array,
		default: () => [],
	},
})

const emit = defineEmits(['update:modelValue', 'select'])

const isOpen = ref(false)
const inputValue = ref(props.modelValue)


watch(
	() => props.modelValue,
	(v) => {
		inputValue.value = v
	}
)

const filtered = computed(() =>
	props.suggestions
		.filter((item) => typeof item === 'string')
		.filter(
			(item) =>
				item.toLowerCase().includes(inputValue.value.toLowerCase()) &&
				item.toLowerCase() !== inputValue.value.toLowerCase()
		)
)

function onFocus() {
	isOpen.value = true
}

function onBlur() {
	setTimeout(() => {
		isOpen.value = false
	}, 100)
}

function onInput(val) {
	emit('update:modelValue', val)
	isOpen.value = true
}

function selectItem(item) {
	emit('update:modelValue', item)
	emit('select', item)
	isOpen.value = false
}
</script>

<template>
	<div class="relative w-full">
		<BaseInput
			v-model="inputValue"
			:placeholder="placeholder"
			@focus="onFocus"
			@blur="onBlur"
			@update:modelValue="onInput"
		/>

		<ul
			v-if="isOpen && filtered.length"
			class="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-48 overflow-auto"
		>
			<li
				v-for="item in filtered"
				:key="item"
				@mousedown.prevent="selectItem(item)"
				class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>
