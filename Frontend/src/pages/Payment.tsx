import Stepper from '../components/Stepper';
import { Link } from 'react-router-dom';

const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subTotal + tax + shippingCharges - discount;

const Payment = () => {
	return (
		<div className='mt-4 md:mt-10'>
			<h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>Payment</h1>

			<Stepper step={3} />

			<div className='flex flex-col mt-4 md:mt-10 lg:flex-row lg:space-x-6'>
				<main className='lg:w-2/3'>
					<h3 className='font-semibold text-lg tracking-wide text-[#212b36]'>Payment Details</h3>
					<div className='grid grid-cols-2 gap-5 mt-6'></div>
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

					<Link to='/payment'>
						<button className='w-full py-3 font-bold tracking-wide text-white bg-[#212b36] hover:bg-[#454f5b] rounded-lg mt-10 '>
							Complete Order
						</button>
					</Link>
				</aside>
			</div>
		</div>
	);
};
export default Payment;
