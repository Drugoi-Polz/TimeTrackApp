<script setup>
import SideBarItem from './SideBarItem.vue'
import { items } from "../../constans"
</script>

<template>
	<aside class="w-54 bg-gray-800 h-full flex flex-col">
		<div class="p-6 text-xl font-bold text-white">Time Tracker</div>
		<nav class="flex-1 overflow-auto">
			<SideBarItem
				v-for="item in items"
				:key="item.label"
				:to="item.to"
				:icon="item.icon"
				:label="item.label"
			/>
		</nav>
		<div class="p-6 text-gray-400 text-sm"><strong>Project for Alkona</strong><p>by Drugoi-Polz 2025</p></div>
	</aside>
</template>
