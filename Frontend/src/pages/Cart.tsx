import CartItem from '../components/CartItem';

const Cart = () => {
	return (
		<div>
			<h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>Shopping Cart</h1>

			<div className='flex flex-col mt-10 lg:flex-row lg:space-x-6'>
				<main className='lg:w-2/3 divide-y-[1px] rounded-xl'>
					<CartItem />
					<CartItem />
					<CartItem />
					<CartItem />
				</main>

				<aside className='mt-6 lg:mt-0 lg:w-1/3 p-6 lg:p-10 h-fit border-[1px] shadow-md rounded-2xl'>
					<h2 className='text-xl font-bold text-gray-900'>Summary</h2>
					<div className='mt-6 space-y-3 text-sm '>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Sub Total</p>
							<span className='font-semibold text-[#212b36]'>$25.55</span>
						</div>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Shipping Charges</p>
							<span className='font-semibold text-[#212b36]'>$25.55</span>
						</div>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Tax</p>
							<span className='font-semibold text-[#212b36]'>$25.55</span>
						</div>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Discount</p>
							<span className='font-semibold text-[#212b36]'>$25.55</span>
						</div>
					</div>
					<div className='flex justify-between border-t-[1px] mt-5 pt-4'>
						<p className='text-lg font-medium'>Total</p>
						<span className='font-medium text-lg text-[#ff5630]'>$25.55</span>
					</div>

					<div className='relative has-[:focus]:border-black mt-5 border-2 rounded-lg '>
						<input
							className='py-4 pl-3 rounded-lg outline-none placeholder:text-black'
							type='text'
							placeholder='DISCOUNT5'
						/>
						<button className='text-[#00a76f] font-medium hover:bg-[#ebf8f4] rounded-lg px-3 py-2 absolute right-2 top-2'>
							Apply
						</button>
					</div>

					<button className='w-full py-3 font-bold tracking-wide text-white bg-[#212b36] hover:bg-[#454f5b] rounded-lg mt-10 '>
						Check Out
					</button>
				</aside>
			</div>
		</div>
	);
};
export default Cart;
