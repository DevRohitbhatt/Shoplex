import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useState } from 'react';

const CartItem = () => {
	const [quantity, setQuantity] = useState<number>(1);

	return (
		<div className='relative justify-between py-5 sm:flex'>
			<div className='flex space-x-3 sm:items-center'>
				<img
					className='w-20 rounded-xl'
					src='https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg'
					alt=''
				/>
				<h2 className='text-sm font-semibold text-[#212b36] tracking-wide'>Zoom Freak 2</h2>
			</div>

			<div className='absolute right-0 flex items-center sm:static bottom-8 space-x-14'>
				<div className='flex p-1.5 justify-between w-[88px] border-2 rounded-lg h-fit'>
					<button
						onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
						className='px-1 rounded-md active:bg-gray-200'
					>
						<AiOutlineMinus />
					</button>
					<span className='text-center '>{quantity}</span>
					<button
						onClick={() => setQuantity((prev) => prev + 1)}
						className='px-1 rounded-md active:bg-gray-200'
					>
						<AiOutlinePlus />
					</button>
				</div>

				<span className='font-medium text-[#212b36]'>$25.55</span>

				<div className='p-2 rounded-full hover:bg-gray-100'>
					<svg
						className='text-xl text-gray-500 cursor-pointer'
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
							d='M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877'
						></path>
						<path
							fill='currentColor'
							fillRule='evenodd'
							d='M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707'
							clipRule='evenodd'
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
