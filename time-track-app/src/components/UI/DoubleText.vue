<script setup> 
    defineProps({
        label: {
            type: String,
            required: true
        },
        value: {
            required: true
        }
    })
</script>

<template>
	<div class="mb-2 text-gray-600 text-xl">
		{{ label }}:
		<span class="font-bold">
			{{ value }}
		</span>
	</div>
</template>
