<script setup>
import BaseButton from '../components/UI/BaseButton.vue';
import ThePageTitle from '../components/UI/ThePageTitle.vue'
</script>

<template>
    <div class="p-8 h-screen flex flex-col bg-gray-100">
        <ThePageTitle>Задачи</ThePageTitle>
        <div class="grid grid-cols-3 gap-8 flex-1">
            <div class="col-span-2 bg-white rounded-2xl shadow-xl shadow-gray-300 p-4">
                <div class="flex justify-end mb-4">
                    <BaseButton>
                        Создать задачу
                    </BaseButton>
                </div>
                <!-- Контент первой части -->
            </div>
            <div class="col-span-1 bg-white rounded-2xl shadow-xl shadow-gray-300 p-4">
                <div class="flex justify-end mb-4">
                    <BaseButton>
                        Создать шаблон
                    </BaseButton>
                </div>
                <!-- Контент второй части -->
            </div>
        </div>
    </div>
</template>