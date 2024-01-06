import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from './assets/logo.png';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	const location = useLocation();

	return (
		<div className='font'>
			<div
				className={`container ${
					location.pathname !== '/login' && location.pathname !== '/register' ? 'max-w-6xl ' : ''
				} px-4 m-auto mt-4`}
			>
				{location.pathname !== '/login' && location.pathname !== '/register' ? (
					<Header />
				) : (
					<Link to='/'>
						<img className=' w-36' src={logo} alt='' />
					</Link>
				)}
				<Outlet />
			</div>
			{location.pathname !== '/login' && location.pathname !== '/register' ? <Footer /> : null}
		</div>
	);
}

export default App;
