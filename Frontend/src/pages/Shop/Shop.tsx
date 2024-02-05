import { FiSearch } from 'react-icons/fi';
import { MdFilterList, MdClose } from 'react-icons/md';
import ProductCard from './ProductCard';

const Shop = () => {
	return (
		<div>
			<div className='mt-4 md:mt-10'>
				<h1 className='text-2xl font-bold text-gray-900'>Shop</h1>

				<div className='flex items-center justify-between'>
					<div className='flex space-x-3 items-center rounded-md ring-gray-200 ring-[1px] w-fit p-2 pr-9 hover:ring-black has-[:focus]:ring-black has-[:focus]:ring-2 mt-10'>
						<FiSearch className='ml-2 text-lg text-gray-400' />
						<input className='px-1 py-2 text-sm outline-none' placeholder='Search...' type='text' />
					</div>

					<div className='flex items-center p-2 space-x-2 font-bold rounded-md cursor-pointer hover:bg-gray-100 '>
						<span className='text-sm tracking-wide'>Filters</span>
						<MdFilterList size={20} />
					</div>

					<div className='fixed top-0 bottom-0 right-0 z-50 bg-white shadow-xl w-72'>
						<div className='flex justify-between font-bold border-b-[1px] p-4'>
							<span className='text-lg tracking-wide'>Filters</span>
							<MdClose size={24} />
						</div>
					</div>
				</div>

				<div className='grid gap-6 mt-6 md:mt-10 sm:grid-cols-2 lg:grid-cols-4 '>
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			</div>
		</div>
	);
};
export default Shop;
