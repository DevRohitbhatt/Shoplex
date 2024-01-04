import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Shop, Home, Cart } from './pages/index.tsx';
import Loader from './components/Loader.tsx';
import ProductDetails from './components/ProductDetails.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={
				<Suspense fallback={<Loader />}>
					<App />
				</Suspense>
			}
		>
			<Route index element={<Home />} />
			<Route path='shop' element={<Shop />} />
			<Route path='shop/product' element={<ProductDetails />} />
			<Route path='cart' element={<Cart />} />
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
