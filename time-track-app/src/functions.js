import { isSameDay, format, startOfDay } from 'date-fns'

export function formatTime(sec) {
	const h = Math.floor(sec / 3600)
		.toString()
		.padStart(2, '0')
	const m = Math.floor((sec % 3600) / 60)
		.toString()
		.padStart(2, '0')
	const s = (sec % 60).toString().padStart(2, '0')
	return `${h}:${m}:${s}`
}

export function formatTimestamp(timestamp) {
	return format(new Date(timestamp), 'HH:mm:ss')
}

export function label(date, todayDate = startOfDay(new Date())) {
	return isSameDay(date, todayDate) ? 'Сегодня' : format(date, 'dd.MM')
}

export function getActivitiesForDate(activities, date) {
	return activities
		.map((act) => ({
			...act,
			intervals: act.intervals.filter((iv) =>
				isSameDay(new Date(iv.start), date)
			),
		}))
		.filter((act) => act.intervals.length > 0)
}