import { ColumnDef } from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import TableHOC from '../../components/admin/TableHOC';
import { BiSolidPencil } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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
		id: 1,
		user: 'Rohit',
		price: 100,
		discount: 50,
		quantity: 2,
		status: 'completed',
	},
	{
		id: 2,
		user: 'Ujjwal',
		price: 100,
		discount: 50,
		quantity: 2,
		status: 'completed',
	},
	{
		id: 3,
		user: 'Sumit',
		price: 100,
		discount: 50,
		quantity: 2,
		status: 'pending',
	},
];

const Orders = () => {
	const [rows, setRows] = useState<DataType[]>([]);

	useEffect(() => {
		setRows(
			data.map((i) => ({
				user: i.user,
				price: <span>₹{i.price}</span>,
				discount: i.discount,
				quantity: i.quantity,
				status: (
					<span
						className={` py-1 px-2 text-sm font-bold rounded-lg tracking-wide
					  ${
							i.status === 'pending'
								? 'text-[#B76E00] bg-[#f7ead0]'
								: i.status === 'completed'
								? 'text-[#00a76f] bg-[#00a76f]/[0.08] '
								: null
						}
					`}
					>
						{i.status}
					</span>
				),
				action: (
					<Link to={`/admin/transaction/${i.id}`}>
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
			</div>
			{Table}
		</div>
	);
};
export default Orders;
