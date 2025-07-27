import { BUTTON_CONTENT_TYPES, BUTTON_TYPES } from './constans'

export function isButtonTypeValid(value) {
	return BUTTON_TYPES.includes(value)
}

export function isButtonContentTypeValid(value) {
	return BUTTON_CONTENT_TYPES.includes(value)
}

export function isTaskValid(task) {
	return (
		isStringAndNotEmpty(task.title) &&
		isString(task.description) &&
		isString(task.category) &&
		isString(task.iconName) &&
		isHexColor(task.color)
	)
}

function isString(value) {
    return typeof value === 'string'
}

function isNull(value) {
    return value == null
}

function isStringAndNotEmpty(value) {
	return isString(value) && value.trim().length > 0
}

function isHexColor(value) {
	return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value)
}