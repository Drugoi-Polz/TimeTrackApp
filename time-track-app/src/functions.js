import { format } from 'date-fns'

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