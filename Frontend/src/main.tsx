import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Login, Register, Home, Shop, ProductDetails, Cart, Checkout, Payment, Dashboard } from './pages/index.tsx';
import Loader from './components/Loader.tsx';
import AdminRoute from './pages/admin/AdminRoute.tsx';
import Users from './pages/admin/Users.tsx';
import Products from './pages/admin/Products.tsx';
import Orders from './pages/admin/Orders.tsx';

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route
			path='/'
			element={
				<Suspense fallback={<Loader />}>
					<App />
				</Suspense>
			}
		>
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
			<Route index element={<Home />} />
			<Route path='shop' element={<Shop />} />
			<Route path='shop/product' element={<ProductDetails />} />
			<Route path='cart' element={<Cart />} />
			<Route path='checkout' element={<Checkout />} />
			<Route path='payment' element={<Payment />} />
		</Route>,
		<Route
			path='/admin'
			element={
				<Suspense fallback={<Loader />}>
					<AdminRoute />
				</Suspense>
			}
		>
			<Route index path='dashboard' element={<Dashboard />} />
			<Route path='user' element={<Users />} />
			<Route path='product' element={<Products />} />
			<Route path='order' element={<Orders />} />
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
