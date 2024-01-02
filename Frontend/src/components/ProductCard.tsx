import { Link } from 'react-router-dom';

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

const ProductCard = ({ productId, name, price, image, stock, handler }: ProductPorps) => {
	return (
		<Link to={`/product/${productId}`} className='hover:bg-gray-100 flex flex-col p-4 border-[1px] rounded-2xl'>
			<img className='bg-gray-100 rounded-2xl' src={`${server} / ${image}`} alt='name' />
			<h1 className='mt-4 font-medium'>{name}</h1>
			<span className='mt-1 font-medium'>₹{price}</span>
		</Link>
	);
};
export default ProductCard;
