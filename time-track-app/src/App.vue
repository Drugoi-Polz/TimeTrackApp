<script setup>
import Sidebar from "./components/TheSideBar.vue";
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
