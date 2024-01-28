import { ColumnDef } from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import TableHOC from '../../components/admin/TableHOC';
import { BiSolidPencil } from 'react-icons/bi';

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
		photo: (
			<img
				className='w-16 rounded-xl'
				src={`https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg`}
				alt='...'
			/>
		),
		name: 'Nike Air Force 1 NDESTRUKT',
		price: <span>₹100</span>,
		stock: 100,
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
	{
		photo: (
			<img
				className='w-16 rounded-xl'
				src={`https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg`}
				alt='...'
			/>
		),
		name: 'Fike Air Force 1 NDESTRUKT',
		price: <span>₹100</span>,
		stock: 100,
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
	{
		photo: (
			<img
				className='w-16 rounded-xl'
				src={`https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg`}
				alt='...'
			/>
		),
		name: 'Sike Air Force 1 NDESTRUKT',
		price: <span>₹100</span>,
		stock: 100,
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
	{
		photo: (
			<img
				className='w-16 rounded-xl'
				src={`https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg`}
				alt='...'
			/>
		),
		name: 'Sike Air Force 1 NDESTRUKT',
		price: <span>₹100</span>,
		stock: 100,
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
];

const Products = () => {
	const [rows, setRows] = useState<DataType[]>([]);

	useEffect(() => {
		setRows(data);
	}, []);

	const Table = TableHOC<DataType>(columns, rows);
	return <div>{Table}</div>;
};
export default Products;
