import { Link } from 'react-router-dom';
import productUrl from '../assets/product_5.png';

type ProductPorps = {
	productId: string;
	name: string;
	price: number;
	image: string;
	description: string;
	category: string;
	stock: number;
	handler: () => void;
};

const server = 'ddfdsga';

const TopProduct = ({ productId, name, price, image, stock, handler }: ProductPorps) => {
	return (
		<Link to='/shop/product' className='hover:bg-gray-100 flex flex-col p-4 border-[1px] rounded-2xl'>
			<img className='bg-gray-100 rounded-2xl' src={productUrl} alt='name' />
			<h1 className='mt-4 font-medium'>Apple Iphone</h1>
			<span className='mt-1 font-medium'>₹1,20,000</span>
		</Link>
	);
};
export default TopProduct;
