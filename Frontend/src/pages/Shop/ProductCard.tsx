import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';

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
		<div className='flex flex-col p-2 pb-6 shadow-lg border-[1px] rounded-2xl group'>
			<div className='relative'>
				<img
					className='bg-gray-100 rounded-2xl'
					src={`https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg`}
					alt='name'
				/>
				<div className='hidden absolute bottom-0 right-0 p-4 m-2 rounded-full bg-[#ffab00] group-hover:block hover:bg-[#b76e00] cursor-pointer'>
					<FaCartPlus size={20} />
				</div>
			</div>
			<Link to='/shop/product'>
				<h1 className='pl-4 mt-4 font-semibold text-[#212B36] text-sm hover:underline tracking-wide'>
					Nike Jorden
				</h1>
			</Link>
			<span className='pl-4 mt-2 font-semibold text-[#212B36] tracking-wide'>₹20,000</span>
		</div>
	);
};
export default ProductCard;
