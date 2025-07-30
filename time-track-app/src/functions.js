import { isSameDay, format, startOfDay } from 'date-fns'

export function formatTime(seconds) {
	const hrs = Math.floor(seconds / 3600)
	const mins = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60
	if (hrs > 0) return `${hrs}ч ${mins}м`
	if (mins > 0) return `${mins}м ${secs}с`
	return `${secs}с`
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
			intervals: act.intervals.filter((iv) => isSameDay(new Date(iv.start), date)),
		}))
		.filter((act) => act.intervals.length > 0)
}

export function summarizeByTask(activities) {
	const map = new Map()
	activities.forEach((act) => {
		const sum = act.intervals.reduce((acc, iv) => acc + iv.duration, 0)
		if (map.has(act.id)) {
			map.get(act.id).total += sum
		} else {
			map.set(act.id, { id: act.id, title: act.title, total: sum, color: act.color })
		}
	})
	return Array.from(map.values())
}

export function toMinutes(seconds) {
	return Math.round(seconds / 60)
}
