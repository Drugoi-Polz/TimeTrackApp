import { formatTime } from '../../functions'

export function getBarChartData(data, toMinutes) {
	return {
		labels: data.map((item) => item.title),
		datasets: [
			{
				label: 'Минуты',
				data: data.map((item) =>
					toMinutes(item.intervals.reduce((sum, i) => sum + i.duration, 0))
				),
				backgroundColor: data.map((item) => item.color || '#9CA3AF'),
				borderRadius: 6,
				barThickness: 'flex',
			},
		],
	}
}

export function getPieChartData(data) {
	return {
		labels: data.map((item) => item.title),
		datasets: [
			{
				data: data.map((item) => item.intervals.reduce((sum, i) => sum + i.duration, 0)),
				backgroundColor: data.map((item) => item.color || '#9CA3AF'),
				borderWidth: 0,
				hoverOffset: 8,
			},
		],
	}
}

export function getLegendItems({ data, chartData, format = 'minutes' }) {
	const values = chartData.datasets[0].data
	const total = values.reduce((a, b) => a + b, 0)

	return data.map((item, idx) => {
		const val = values[idx]
		const legend = {
			title: item.title,
			color: item.color || '#9CA3AF',
		}
		legend.value = format === 'seconds' ? formatTime(val) : `${val}м`
		const pct = total ? Math.round((val / total) * 100) : 0
		legend.percentage = `${pct}%`
		return legend
	})
}
