import { HomeIcon, ClockIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

export const DEFAULT_BUTTON = 'default';
export const PRIMARY_BUTTON = 'primary';
export const DANGER_BUTTON = 'danger';
export const SUCCESS_BUTTON = 'success';

export const TEXT_BUTTON_CONTENT = 'text';
export const ICON_BUTTON_CONTENT = 'icon';

export const items = [
    { label: 'Задачи', to: '/tasks', icon: HomeIcon },
    { label: 'Активности', to: '/activities', icon: ClockIcon },
    { label: 'Статистика', to: '/statistics', icon: ChartBarIcon },
]

export const BUTTON_TYPES = [
	PRIMARY_BUTTON, DANGER_BUTTON, SUCCESS_BUTTON, DEFAULT_BUTTON
]

export const BUTTON_CONTENT_TYPES = [
    TEXT_BUTTON_CONTENT, ICON_BUTTON_CONTENT
]

export const STORAGE_KEYS = {
	tasks: 'myapp_tasks',
	templates: 'myapp_templates',
	categories: 'myapp_categories',
}