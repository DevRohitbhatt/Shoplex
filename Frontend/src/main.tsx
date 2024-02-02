import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import {
	Login,
	Register,
	Home,
	Shop,
	ProductDetails,
	Cart,
	Checkout,
	Payment,
	Dashboard,
	AdminRoute,
	Users,
	Products,
	Orders,
	PageNotFound,
} from './pages/index.tsx';
import Loader from './components/Loader.tsx';
import UserOrders from './pages/User/UserOrders.tsx';

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
			<Route path='orders' element={<UserOrders />} />
			<Route path='*' element={<PageNotFound />} />
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
			<Route path='*' element={<PageNotFound />} />
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
