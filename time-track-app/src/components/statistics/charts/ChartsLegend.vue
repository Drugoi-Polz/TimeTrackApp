<script setup>
const props = defineProps({
	items: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<div class="w-full max-w-3xl mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
		<div
			v-for="(item, idx) in items"
			:key="idx"
			class="flex items-center p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition"
		>
			<span
				class="w-5 h-5 rounded-full flex-shrink-0"
				:style="{ backgroundColor: item.color }"
			></span>
			<div class="ml-3 flex-1 min-w-0">
				<p class="text-sm font-medium text-gray-800 truncate">{{ item.title }}</p>
				<div class="mt-1 flex justify-between text-xs text-gray-600">
					<span>{{ item.value }}</span>
					<span>{{ item.percentage }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
