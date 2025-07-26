<template>
  <aside class="w-64 bg-gray-800 text-white h-full flex flex-col">
    <div class="p-6 text-xl font-semibold">Time Tracker</div>
    <nav class="flex-1">
      <ul>
        <li class="px-6 py-3 hover:bg-gray-700">
          <router-link to="/tasks">Задачи</router-link>
        </li>
        <li class="px-6 py-3 hover:bg-gray-700">
          <router-link to="/activities">Активности</router-link>
        </li>
        <li class="px-6 py-3 hover:bg-gray-700">
          <router-link to="/statistics">Статистика</router-link>
        </li>
      </ul>
    </nav>
    <div class="p-6">
      <!-- Дополнительные кнопки/инфо -->
    </div>
  </aside>
</template>
