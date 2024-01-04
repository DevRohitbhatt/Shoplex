import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	const location = useLocation();

	return (
		<>
			<div className={`container ${location.pathname !== '/login' ? 'max-w-6xl ' : ''} px-4 m-auto mt-4`}>
				{location.pathname !== '/login' ? <Header /> : null}
				<Outlet />
			</div>
			{location.pathname !== '/login' ? <Footer /> : null}
		</>
	);
}

export default App;
