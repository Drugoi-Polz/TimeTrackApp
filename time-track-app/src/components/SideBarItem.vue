<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  icon: { 
    type: [Object, Function], 
    required: true 
  },
  label: {
    type: String,
    required: true,
  },
});

const route = useRoute();

const isActive = computed(() => {
  let target = props.to;
  if (typeof target !== "string") {
    target = target.path;
  }
  return route.path === target;
});
</script>

<template>
  <router-link
    :to="to"
    class="flex items-center px-6 py-3 rounded-lg mb-1 transition-colors"
    :class="
      isActive
        ? 'bg-gray-700 text-teal-500 pointer-events-none'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    "
  >
    <component :is="icon" class="w-6 h-6 mr-3" />
    <span class="font-bold">{{ label }}</span>
  </router-link>
</template>
