import { isSameDay, format, startOfDay } from 'date-fns'

// вывод оптимального формата времени
export function formatTime(seconds) {
	const hrs = Math.floor(seconds / 3600)
	const mins = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60
	if (hrs > 0) return `${hrs}ч ${mins}м`
	if (mins > 0) return `${mins}м ${secs}с`
	return `${secs}с`
}

// форматирование к точному времени
export function formatTimestamp(timestamp) {
	return format(new Date(timestamp), 'HH:mm:ss')
}

// вывод даты с заменой на "сегодня"
export function label(date, todayDate = startOfDay(new Date())) {
	return isSameDay(date, todayDate) ? 'Сегодня' : format(date, 'dd.MM')
}

//активности текущего дня
export function getActivitiesForDate(activities, date) {
	return activities
		.map((act) => ({
			...act,
			intervals: act.intervals.filter((iv) => isSameDay(new Date(iv.start), date)),
		}))
		.filter((act) => act.intervals.length > 0)
}

// перевод в минуты для графика
export function toMinutes(seconds) {
	return Math.round(seconds / 60)
}

// вся длительность активности
export function totalDuration(intervals) {
	return intervals.reduce((sum, i) => sum + i.duration, 0)
}

// парсинг цвета из hex в rgb
export function hexToRgba(hex, alpha = 1) {
	const h = hex.replace('#', '')
	const bigint = parseInt(
		h.length === 3
			? h
					.split('')
					.map((x) => x + x)
					.join('')
			: h,
		16
	)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function getCardStyles(color, hovered, alpha = 0.4) {
	const c = color || '#cccccc'
	const baseShadow = `0 2px 4px ${hexToRgba(c, alpha)}`
	const hoverShadow = `0 4px 12px ${hexToRgba(c, alpha)}`

	return {
		border: `1px solid ${hexToRgba(c, alpha)}`,
		boxShadow: hovered ? hoverShadow : baseShadow,
		transition: 'box-shadow 0.2s ease',
	}
}
