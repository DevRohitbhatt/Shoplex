import { Link } from 'react-router-dom';

type ProductPorps = {
	productId: string;
	name: string;
	price: number;
	image: string;
	stock: number;
};

const server = 'ddfdsga';

const TopProduct = ({ productId, name, price, image, stock, handler }: ProductPorps) => {
	return (
		<Link to='/shop/product' className='hover:bg-gray-100 flex flex-col p-4 border-[1px] rounded-2xl'>
			<img className='bg-gray-100 rounded-2xl' src={image} alt='' />
			<h1 className='mt-4 font-semibold text-sm text-[#212B36]'>{name}</h1>
			<span className='mt-1 font-semibold text-[#212B36] text-sm tracking-wide'>₹{price}</span>
		</Link>
	);
};
export default TopProduct;
