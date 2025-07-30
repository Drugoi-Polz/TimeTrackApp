<script setup>

defineProps({
    time :{
        type: String,
        default: '00:00:00'
    }
})

</script>

<template>
	<span class="text-xl bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
		{{ time }}
	</span>
</template>
