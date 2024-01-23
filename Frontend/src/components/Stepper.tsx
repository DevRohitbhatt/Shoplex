const steps = ['Login', 'Billing & address', 'Payment'];

const Stepper = ({ step }: { step: number }) => {
	const currentStep = step;

	return (
		<>
			<ul className='relative flex flex-row mt-4 md:mt-10'>
				{steps.map((step, i) => (
					<li key={i} className={`shrink basis-0 flex-1 group gap-x-2 block`}>
						<span className='min-w-[28px] min-h-[28px] group flex items-center text-xs'>
							<span
								className={`flex items-center justify-center flex-shrink-0 font-medium rounded-full w-7 h-7 ${
									currentStep === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-800 bg-gray-100'
								} ${i + 1 < currentStep ? '!bg-emerald-500' : ''}`}
							>
								<span>{i + 1 < currentStep ? null : i + 1}</span>
								<svg
									className={`flex-shrink-0 w-3 h-3 text-white ${
										i + 1 < currentStep ? 'block' : 'hidden'
									}`}
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<polyline points='20 6 9 17 4 12' />
								</svg>
							</span>
							<div
								className={`flex-1 w-full h-px mx-4  group-last:hidden ${
									i + 1 < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
								}`}
							></div>
						</span>
						<span className='block mt-2 text-sm font-semibold text-[#212b36]'>{step}</span>
					</li>
				))}
			</ul>
		</>
	);
};

export default Stepper;
