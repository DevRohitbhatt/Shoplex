import RadialBarChart, { LineChart } from '../../components/admin/Charts';

const Dashboard = () => {
	return (
		<div className='mt-6 lg:px-6'>
			<section className='flex flex-col justify-between gap-6 md:flex-row'>
				<WidgetItem title='Product Sold' value={765} profit={true} percent={10.6} />
				<WidgetItem title='Total Balance' value={18765} profit={false} percent={5.2} />
				<WidgetItem title='Sales Profit' value={4875} profit={true} percent={15.8} />
			</section>

			<section className='flex flex-col justify-between gap-6 mt-7 md:flex-row'>
				{/* Gender Graph */}
				<div className='py-6 border-[1px] shadow-lg rounded-2xl w-full md:w-1/2'>
					<h3 className='px-6 mb-4 text-lg font-bold'>Sale By Gender</h3>
					<RadialBarChart labels={['Male', 'Female']} series={[44, 75]} colors={['#00A76F', '#FFAB00']} />
				</div>
				{/* Income vs Expense graph */}
				<div className='p-6 border-[1px] shadow-lg rounded-2xl w-full '>
					<LineChart />
				</div>
			</section>
		</div>
	);
};

interface WidgetItemProps {
	title: string;
	value: number;
	percent: number;
	profit: boolean;
}

const WidgetItem = ({ title, value, profit, percent }: WidgetItemProps) => {
	return (
		<div className='rounded-2xl border-[1px] shadow-lg p-6'>
			<h3 className='text-sm font-semibold tracking-wide text-gray-700'>{title}</h3>
			<span className='block mt-5 text-3xl font-bold'>{value}</span>
			<div className='flex mt-5 space-x-1'>
				<div
					className={`${
						profit ? 'text-[#00a76f] bg-[#00a76f]/[0.08]' : 'text-[#ff5630] bg-[#ff5630]/[0.08]'
					} rounded-full w-fit h-fit p-1 mr-1`}
				>
					{profit ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
							aria-hidden='true'
							role='img'
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path
								fill='currentColor'
								d='M21 7a.78.78 0 0 0 0-.21a.64.64 0 0 0-.05-.17a1.1 1.1 0 0 0-.09-.14a.75.75 0 0 0-.14-.17l-.12-.07a.69.69 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71l-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34l4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0z'
							></path>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
							aria-hidden='true'
							role='img'
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path
								fill='currentColor'
								d='M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7L4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57l4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1.19 1.19 0 0 0 .15-.09a.75.75 0 0 0 .14-.17a1.1 1.1 0 0 0 .09-.14a.64.64 0 0 0 .05-.17A.78.78 0 0 0 21 17Z'
							></path>
						</svg>
					)}
				</div>
				<span className='text-sm font-medium '>
					{profit ? '+' : '-'}
					{percent}% <span className='text-gray-500 '>than last weak</span>
				</span>
			</div>
		</div>
	);
};

export default Dashboard;
