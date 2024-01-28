import ProductCard from './ProductCard';

const Shop = () => {
	return (
		<div>
			<div className='mt-4 md:mt-10'>
				<h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>Shop</h1>
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
