<script setup>
import { NoSymbolIcon } from '@heroicons/vue/24/outline'
</script>

<template>
	<div class="absolute inset-0 flex flex-col items-center justify-center">
		<div class="p-8 bg-white rounded-full shadow-2xl mb-6">
			<NoSymbolIcon class="w-48 h-48 text-gray-600 animate-pulse" />
		</div>
		<p class="text-3xl font-semibold text-gray-500 mb-2">Нет данных</p>
		<p class="text-xl text-gray-400">Попробуйте выбрать другую дату</p>
	</div>
</template>
