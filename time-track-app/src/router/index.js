import { createRouter, createWebHistory } from 'vue-router';
import TasksPage from "../pages/TheTasksPage.vue";
import ActivitiesPage from '../pages/TheActivitiesPage.vue';
import StatisticsPage from '../pages/TheStatisticsPage.vue';

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/tasks', component: TasksPage },
  { path: '/activities', component: ActivitiesPage },
  { path: '/statistics', component: StatisticsPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;