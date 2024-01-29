import { ColumnDef } from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import TableHOC from '../../components/admin/TableHOC';
import { BiSolidPencil } from 'react-icons/bi';

interface DataType {
	user: string;
	price: ReactElement;
	discount: number;
	quantity: number;
	status: ReactElement;
	action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
	{
		header: 'User',
		accessorKey: 'user',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Price',
		accessorKey: 'price',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Discount',
		accessorKey: 'discount',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Quantity',
		accessorKey: 'quantity',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Status',
		accessorKey: 'status',
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
		user: 'Rohit',
		price: <span>₹100</span>,
		discount: 50,
		quantity: 2,
		status: (
			<span className='py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] '>
				Completed
			</span>
		),
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
	{
		user: 'Ujjwal',
		price: <span>₹100</span>,
		discount: 50,
		quantity: 2,
		status: (
			<span className='py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] '>
				Completed
			</span>
		),
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
	{
		user: 'Sumit',
		price: <span>₹100</span>,
		discount: 50,
		quantity: 2,
		status: (
			<span className='py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#B76E00] bg-[#f7ead0]'>
				Pending
			</span>
		),
		action: (
			<button className='flex space-x-2 items-center py-1 px-2 text-sm font-bold rounded-lg tracking-wide text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]'>
				<BiSolidPencil /> <span>Edit</span>
			</button>
		),
	},
];

const Orders = () => {
	const [rows, setRows] = useState<DataType[]>([]);

	useEffect(() => {
		setRows(data);
	}, []);

	const Table = TableHOC<DataType>(columns, rows);
	return (
		<div className='mt-6 lg:px-6'>
			<div className='flex justify-between my-10'>
				<h1 className='text-2xl font-bold'>List</h1>
			</div>
			{Table}
		</div>
	);
};
export default Orders;
