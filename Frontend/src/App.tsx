import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	return (
		<>
			<div className='container max-w-6xl px-4 m-auto mt-6'>
				<Header />
				<Outlet />
			</div>
			<Footer />
		</>
	);
}

export default App;