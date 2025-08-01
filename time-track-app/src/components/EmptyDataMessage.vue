<script setup>
import { NoSymbolIcon } from '@heroicons/vue/24/outline'
</script>

<template>
	<div class="flex flex-col items-center justify-center text-gray-500 mt-16 space-y-4">
		<p class="text-lg font-medium">Нет данных на выбранную дату</p>
		<p class="text-sm">Попробуйте выбрать другую дату внизу.</p>
		<div class="flex flex-col justify-center items-center">
			<NoSymbolIcon class="h-50" />
		</div>
	</div>
</template>
