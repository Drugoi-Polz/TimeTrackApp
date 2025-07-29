<script setup>
const props = defineProps({
	text: {
		type: String,
		default: 'Кнопка'
	},
	icon: {
		type: [Object, Function],
		default: 'QuestionMarkCircleIcon'
	},
	modeKey: {
		type: String,
		required: true
	},
	activeMode: {
		type: String,
		default: 'list'
	}
})

function btnClass() {
	const base = 'flex justify-center items-center gap-3 p-4 rounded-2xl w-full transition-colors duration-200'
	return props.modeKey === props.activeMode
		? base + ' bg-indigo-300 text-white'
		: base + ' bg-gray-200 text-gray-800 hover:bg-gray-300'
}
</script>

<template>
	<button :class="btnClass()" @click="$emit('click')">
		<div class="h-8 w-8">
			<component :is="icon" />
		</div>
		<h1 class="text-3xl">{{ text }}</h1>
	</button>
</template>
