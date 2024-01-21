import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { HiShoppingBag, HiUserCircle, HiShoppingCart } from 'react-icons/hi';
import { RiDashboardFill } from 'react-icons/ri';
import { IconType } from 'react-icons';

const Dashboard = () => {
	return (
		<div className='h-screen px-4 py-6 border-r-[1px] w-72'>
			<Link to='/'>
				<img className='ml-3 w-36' src={logo} alt='logo' />
			</Link>

			<div className='flex flex-col mt-4 space-y-2'>
				<h1 className='ml-4 my-3 uppercase text-[#637381] text-xs font-bold'>Dashboard</h1>
				<Li url='/admin/dashboard' text='Dashboard' Icon={RiDashboardFill} />
				<Li url='/admin/user' text='User' Icon={HiUserCircle} />
				<Li url='/admin/product' text='Product' Icon={HiShoppingBag} />
				<Li url='/admin/order' text='Order' Icon={HiShoppingCart} />
			</div>
		</div>
	);
};

interface LiProps {
	url: string;
	text: string;
	Icon: IconType;
}

const Li = ({ url, text, Icon }: LiProps) => (
	<NavLink
		className={({ isActive }) =>
			`flex items-center space-x-3 p-3 rounded-lg text-sm font-semibold tracking-wide ${
				isActive ? 'text-[#00a76f] bg-[#00a76f]/[0.08] hover:bg-[#d6f1e8]' : 'text-[#637381] hover:bg-[#f6f7f8]'
			}`
		}
		to={url}
	>
		<Icon size={24} />
		<span>{text}</span>
	</NavLink>
);

export default Dashboard;
