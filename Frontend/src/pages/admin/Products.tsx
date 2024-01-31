import { ColumnDef } from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import TableHOC from '../../components/admin/TableHOC';
import { BiSolidPencil } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';

interface DataType {
	photo: ReactElement;
	name: string;
	price: ReactElement;
	stock: number;
	action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
	{
		header: 'Photo',
		accessorKey: 'photo',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Name',
		accessorKey: 'name',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Price',
		accessorKey: 'price',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Stock',
		accessorKey: 'stock',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Action',
		accessorKey: 'action',
		cell: (info) => info.getValue(),
	},
];

const data = [
	{
		id: 1,
		photo: 'https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
		name: 'Nike Air Force 1 NDESTRUKT',
		price: 100,
		stock: 100,
	},
	{
		id: 2,
		photo: 'https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
		name: 'Fike Air Force 1 NDESTRUKT',
		price: 100,
		stock: 100,
	},
	{
		id: 3,
		photo: 'https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
		name: 'Sike Air Force 1 NDESTRUKT',
		price: 100,
		stock: 100,
	},
];

const Products = () => {
	const [rows, setRows] = useState<DataType[]>([]);

	useEffect(() => {
		setRows(
			data.map((i) => ({
				photo: <img className='w-16 rounded-xl' src={i.photo} alt='...' />,
				name: i.name,
				price: <span>₹{i.price}</span>,
				stock: i.stock,
				action: (
					<Link to={`/admin/product/${i.id}`}>
						<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
							<BiSolidPencil /> <span>Edit</span>
						</button>
					</Link>
				),
			}))
		);
	}, []);

	const Table = TableHOC<DataType>(columns, rows);
	return (
		<div>
			<div className='flex justify-between my-8'>
				<h1 className='text-2xl font-bold'>List</h1>
				<button className='w-fit flex space-x-2 py-1.5 pl-1.5 pr-3 items-center font-bold text-sm text-white bg-[#212b36] hover:bg-[#454f5b] rounded-lg'>
					<GoPlus size={24} className='mr-2' />
					New Product
				</button>
			</div>
			{Table}
		</div>
	);
};
export default Products;
