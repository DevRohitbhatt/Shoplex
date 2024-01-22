import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminRoute = () => {
	return (
		<div className='flex'>
			<AdminSidebar />
			<div className='w-full p-4'>
				<AdminHeader />
				<Outlet />
			</div>
		</div>
	);
};

export default AdminRoute;
