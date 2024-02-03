import { FiSearch } from 'react-icons/fi';
import ProductCard from './ProductCard';

const Shop = () => {
	return (
		<div>
			<div className='mt-4 md:mt-10'>
				<h1 className='font-bold text-gray-900 text-2xl'>Shop</h1>

				<div className='flex space-x-3 items-center rounded-md ring-gray-200 ring-[1px] w-fit p-2 pr-9 hover:ring-black has-[:focus]:ring-black has-[:focus]:ring-2'>
					<FiSearch className='ml-2 text-gray-400 text-lg' />
					<input className='outline-none text-sm py-2 px-1' placeholder='Search...' type='text' />
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
