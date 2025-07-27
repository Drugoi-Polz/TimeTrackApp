<script setup>
import { iconOptions } from '../../iconsList';
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
const emit = defineEmits(['update:modelValue'])

const curentIcon = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
	<label class="text-xl text-gray-600 mb-1 block">Иконка:</label>
	<div class="flex flex-wrap gap-4 mt-2 w-auto">
		<button
			v-for="(IconComponent, name) in iconOptions"
			:key="name"
			@click="curentIcon = name"
			:class="[
				'p-2 border rounded hover:bg-gray-100 ',
				curentIcon === name ? 'border-blue-400 bg-blue-100' : 'border-gray-200',
			]"
		>
			<component :is="IconComponent" class="w-6 h-6 text-gray-700" />
		</button>
	</div>
</template>
