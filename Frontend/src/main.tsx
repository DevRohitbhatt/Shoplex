import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Search, Home, Cart } from './pages/index.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={
				<Suspense>
					<App />
				</Suspense>
			}
		>
			<Route index element={<Home />} />
			<Route path='search' element={<Search />} />
			<Route path='cart' element={<Cart />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
