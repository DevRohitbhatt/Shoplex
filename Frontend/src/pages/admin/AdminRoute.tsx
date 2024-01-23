import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';

const AdminRoute = () => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

	const btnRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const closeOpenMenus = (e: MouseEvent) => {
			if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
				setSidebarIsOpen(false);
			}
		};
		document.addEventListener('mousedown', closeOpenMenus);
		return () => {
			document.removeEventListener('mousedown', closeOpenMenus);
		};
	}, []);

	return (
		<div className='relative flex'>
			<div
				ref={btnRef}
				className={`absolute transform duration-300 ease-in-out lg:static ${
					sidebarIsOpen ? '' : '-translate-x-full lg:translate-x-0'
				}`}
			>
				<AdminSidebar />
			</div>
			<div className='w-full p-4'>
				<div className='flex items-center justify-between w-full lg:justify-end lg:px-6'>
					<div
						className={`${
							sidebarIsOpen ? 'hidden' : ''
						} lg:hidden p-2.5 rounded-full hover:bg-gray-100 cursor-pointer`}
						onClick={() => setSidebarIsOpen((prev) => !prev)}
					>
						<FaBarsStaggered className='text-gray-500' size={20} />
					</div>
					<div className='flex items-center justify-end w-full'>
						<div className='p-2 rounded-full hover:bg-gray-100 hover:scale-105'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
								aria-hidden='true'
								role='img'
								className='text-2xl text-gray-600 rounded-full cursor-pointer '
								width='1em'
								height='1em'
								viewBox='0 0 24 24'
							>
								<path
									fill='currentColor'
									d='M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7'
									opacity='.5'
								></path>
								<path
									fill='currentColor'
									d='M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0'
								></path>
							</svg>
						</div>
						<img
							className='ml-5 rounded-full cursor-pointer w-9 ring-1 ring-offset-2 ring-gray-100 hover:scale-105'
							src='https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
							alt='avatar '
						/>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminRoute;
