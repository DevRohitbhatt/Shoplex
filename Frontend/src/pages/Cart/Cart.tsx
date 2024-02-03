import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const cartItems = [
	{
		productId: 'qwertdzdsga',
		name: 'Zoom Freak 2',
		price: 2000,
		image: 'https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
		quantity: 4,
		stock: 10,
	},
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subTotal + tax + shippingCharges - discount;

const Cart = () => {
	const [couponCode, setCouponCode] = useState<string>('');
	const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			if (Math.random() > 0.5) setIsValidCouponCode(true);
			else setIsValidCouponCode(false);
		}, 1000);

		return () => {
			clearTimeout(timeOutId);
			setIsValidCouponCode(false);
		};
	}, [couponCode]);

	return (
		<div className='mt-4 md:mt-10'>
			<h1 className='text-2xl font-bold text-gray-900'>Shopping Cart</h1>

			<div className='flex flex-col mt-4 md:mt-10 lg:flex-row lg:space-x-6'>
				<main className='lg:w-2/3 divide-y-[1px]'>
					{cartItems.length > 0 ? (
						cartItems.map((i, id) => <CartItem key={id} cartItem={i} />)
					) : (
						<h1>No Items Added</h1>
					)}
				</main>

				<aside className='mt-6 lg:mt-0 lg:w-1/3 p-6 lg:p-10 h-fit border-[1px] shadow-md rounded-2xl'>
					<h2 className='text-xl font-bold text-gray-900'>Summary</h2>
					<div className='mt-6 space-y-3 text-sm '>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Sub Total</p>
							<span className='font-semibold text-[#212b36]'>₹{subTotal}</span>
						</div>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Shipping Charges</p>
							<span className='font-semibold text-[#212b36]'>₹{shippingCharges}</span>
						</div>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Tax</p>
							<span className='font-semibold text-[#212b36]'>₹{tax}</span>
						</div>
						<div className='flex justify-between'>
							<p className='text-gray-600'>Discount</p>
							<span className='font-semibold text-[#212b36]'>- ₹{discount}</span>
						</div>
					</div>
					<div className='flex justify-between border-t-[1px] mt-5 pt-4'>
						<p className='text-lg font-medium'>Total</p>
						<span className='font-medium text-lg text-[#ff5630]'>₹{total}</span>
					</div>

					<div className='relative has-[:focus]:border-black mt-5 border-2 rounded-lg '>
						<input
							className='py-4 pl-3 rounded-lg outline-none placeholder:text-black'
							type='text'
							placeholder='DISCOUNT'
							value={couponCode}
							onChange={(e) => setCouponCode(e.target.value)}
						/>
						<button className='text-[#00a76f] font-medium hover:bg-[#ebf8f4] rounded-lg px-3 py-2 absolute right-2 top-2'>
							Apply
						</button>
					</div>

					{couponCode ? (
						isValidCouponCode ? (
							<span className='text-[#00A76F] text-xs'>
								₹{discount} off using the <code>{couponCode}</code>
							</span>
						) : (
							<span className='text-[#ff5630] text-xs'>Invalid Coupon</span>
						)
					) : null}

					{cartItems.length > 0 && (
						<Link to='/checkout'>
							<button className='w-full py-3 font-bold tracking-wide text-white bg-[#212b36] hover:bg-[#454f5b] rounded-lg mt-10 '>
								Check Out
							</button>
						</Link>
					)}
				</aside>
			</div>
		</div>
	);
};
export default Cart;
