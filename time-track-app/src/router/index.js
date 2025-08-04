import { createRouter, createWebHistory } from 'vue-router';
import TasksPage from '../components/pages/TheTasksPage.vue'
import ActivitiesPage from '../components/pages/TheActivitiesPage.vue';
import StatisticsPage from '../components/pages/TheStatisticsPage.vue';

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