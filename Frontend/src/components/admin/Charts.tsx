import Chart from 'react-apexcharts';

export const LineChart = () => {
	const data = {
		series: [
			{
				name: 'Total Income',
				data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
			},
			{
				name: 'Total Expenses',
				data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
			},
		],
		options: {
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
				width: 3,
			},
			title: {
				text: 'Yearly Sales',
				align: 'left',
			},
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			},
			yaxis: {
				max: 150,
				min: 0,
			},
			legend: {
				show: true,
				position: 'top',
				horizontalAlign: 'right',
				floating: true,
				fontWeight: '600',
				offsetY: -10,
			},
			colors: ['#00A76F', '#FFAB00'],
		},
	};

	return <Chart options={data.options} series={data.series} type='line' height={370} />;
};

interface RadialBarChart {
	labels: string[];
	series: number[];
	colors: string[];
}

const RadialBarChart = ({ labels, series, colors }: RadialBarChart) => {
	const data = {
		series: series,
		options: {
			plotOptions: {
				radialBar: {
					hollow: {
						size: '65%',
					},
					dataLabels: {
						total: {
							show: true,
							label: 'Total',
							fontSize: '24px',
							color: '#6b7280',
						},
						value: {
							fontSize: '20px',
							fontWeight: 'bold',
						},
					},
				},
			},
			labels: labels,
			colors: colors,
			stroke: {
				lineCap: 'round',
			},
			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'center',
			},
			grid: {
				padding: {
					left: 0,
					right: 0,
				},
			},
		},
	};

	return <Chart options={data.options} series={data.series} type='radialBar' height={370} />;
};

export default RadialBarChart;
