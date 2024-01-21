import { Link } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineLogin, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

const user = { _id: 'zzgdg', role: 'admin' };

const Header = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const btnRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const closeOpenMenus = (e: MouseEvent) => {
			if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', closeOpenMenus);
		return () => {
			document.removeEventListener('mousedown', closeOpenMenus);
		};
	}, []);

	return (
		<header className='flex items-center justify-between'>
			<Link to='/'>
				<img className=' w-36' src={logo} alt='' />
			</Link>

			<nav className='flex space-x-2'>
				<Link to='/shop' className='p-2 hover:bg-gray-50 hover:rounded-full'>
					<AiOutlineShopping size={26} />
				</Link>
				<Link to='/cart' className='p-2 hover:bg-gray-50 hover:rounded-full'>
					<AiOutlineShoppingCart size={26} />
				</Link>

				{user._id ? (
					<div className='relative' ref={btnRef}>
						<button
							onClick={() => setIsOpen((prev) => !prev)}
							className='p-2 hover:bg-gray-50 hover:rounded-full'
						>
							<AiOutlineUser size={26} />
						</button>
						<div
							className={`${
								isOpen ? 'flex' : 'hidden'
							} z-[99] absolute right-[30%] flex-col items-start rounded-lg shadow-lg border-2 p-2 bg-gray-50 lg:bg-gradient-to-bl lg:from-gray-100`}
						>
							<div className='w-40 px-2 pt-1 pb-2 rounded-md hover:bg-gray-100'>
								{user.role === 'admin' && <Link to='/admin/dashboard'>Admin</Link>}
							</div>

							<Link to='/orders' className='w-40 px-2 pt-1 pb-2 rounded-md hover:bg-gray-100'>
								Orders
							</Link>
							<Link to='/orders' className='w-40 px-2 pt-1 pb-2 rounded-md hover:bg-gray-100'>
								Wishlist
							</Link>
							<button className='text-[#FF5630] font-semibold w-40 hover:bg-gray-100 px-2 pt-1 rounded-md pb-2 text-start'>
								Logout
							</button>
						</div>
					</div>
				) : (
					<Link to='/login' className='p-2 hover:bg-gray-50 hover:rounded-full'>
						<AiOutlineLogin size={26} />
					</Link>
				)}
			</nav>
		</header>
	);
};
export default Header;
