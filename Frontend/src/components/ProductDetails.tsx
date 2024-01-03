import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import url from '../assets/product_2.png';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
	const [quantity, setQuantity] = useState<number>(1);

	return (
		<div>
			<div className='flex flex-col mt-10 lg:space-x-16 lg:flex-row'>
				<img className='bg-gray-100 lg:w-1/2 rounded-2xl' src={url} alt='' />

				<div className='mt-10 lg:w-1/2 lg:mt-0'>
					<span className='bg-[#dff3ea] text-xs font-bold text-[#1b806a] px-2 py-1 rounded-md'>In Stock</span>
					<h1 className='mt-6 text-2xl font-medium text-gray-900 '>Apple Iphone</h1>
					<div className='flex mt-3 space-x-[1px] text-xl'>
						<AiFillStar className=' text-[#faaf00]' />
						<AiFillStar className='text-[#faaf00]' />
						<AiFillStar className='text-[#faaf00]' />
						<AiFillStar className='text-gray-300' />
						<span className='text-sm font-medium text-gray-400'>(911 reviews)</span>
					</div>
					<span className='block mt-4 text-xl font-medium text-gray-900'>₹1,20,000</span>

					<p className='mt-4 text-gray-600 '>
						Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est
						quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil
						accusantium doloribus eaque debitis.
					</p>

					<div className='flex justify-between pt-6 mt-8 border-t-2'>
						<span className='font-medium'>Quantity</span>
						<div className='flex flex-col items-end'>
							<div className='flex p-1 space-x-2 border-2 rounded-lg'>
								<button
									onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
									className='px-1 rounded-md active:bg-gray-200'
								>
									<AiOutlineMinus />
								</button>
								<span>{quantity}</span>
								<button
									onClick={() => setQuantity((prev) => prev + 1)}
									className='px-1 rounded-md active:bg-gray-200'
								>
									<AiOutlinePlus />
								</button>
							</div>
							<span className='mt-2 text-xs font-medium text-gray-600'>Available: 72</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
