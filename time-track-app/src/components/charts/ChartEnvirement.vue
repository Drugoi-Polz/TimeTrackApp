<script setup>
import ChartsLegend from './ChartsLegend.vue';

defineProps({
    legendItems: Array
})
</script>

<template>
    <div class="flex flex-col items-center w-full">
		<div class="w-full max-w-3xl bg-white rounded-xl shadow border border-gray-200 p-6">
			<h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">
				Распределение времени
			</h3>

			<div class="relative w-full h-64 sm:h-80 lg:h-96">
                <div class="absolute inset-0">
                    <slot> </slot>
                </div>
			</div>
		</div>

		<ChartsLegend :items="legendItems" />
	</div>
</template>