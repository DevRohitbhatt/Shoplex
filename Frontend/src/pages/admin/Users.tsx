import { ColumnDef } from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import { BiSolidPencil } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import TableHOC from '../../components/admin/TableHOC';
import { Link } from 'react-router-dom';

interface DataType {
	avatar: ReactElement;
	name: string;
	email: string;
	gender: string;
	role: string;
	action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
	{
		header: 'Avatar',
		accessorKey: 'avatar',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Name',
		accessorKey: 'name',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Gender',
		accessorKey: 'gender',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Email',
		accessorKey: 'email',
		cell: (info) => info.getValue(),
	},
	{
		header: 'Role',
		accessorKey: 'role',
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
		avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
		name: 'Rohit',
		email: 'qwerty@gmail.com',
		gender: 'male',
		role: 'admin',
	},
	{
		id: 2,
		avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
		name: 'Rohit',
		email: 'qwerty@gmail.com',
		gender: 'male',
		role: 'admin',
	},
	{
		id: 3,
		avatar: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
		name: 'Rohit',
		email: 'qwerty@gmail.com',
		gender: 'male',
		role: 'admin',
	},
];

const Users = () => {
	const [rows, setRows] = useState<DataType[]>([]);

	useEffect(() => {
		setRows(
			data.map((i) => ({
				avatar: <img className='rounded-full w-14' src={i.avatar} alt='...' />,
				name: i.name,
				email: i.email,
				gender: i.gender,
				role: i.role,
				action: (
					<Link to={`/admin/user/${i.id}`}>
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
					New User
				</button>
			</div>
			{Table}
		</div>
	);
};
export default Users;
