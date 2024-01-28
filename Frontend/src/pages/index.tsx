import { lazy } from 'react';

const Login = lazy(() => import('./User/Login.tsx'));
const Register = lazy(() => import('./User/Register.tsx'));
const Home = lazy(() => import('./Home/Home.tsx'));
const Shop = lazy(() => import('./Shop/Shop.tsx'));
const ProductDetails = lazy(() => import('./Shop/ProductDetails.tsx'));
const Cart = lazy(() => import('./Cart/Cart.tsx'));
const Checkout = lazy(() => import('./Order/Checkout.tsx'));
const Payment = lazy(() => import('./Order/Payment.tsx'));
const Dashboard = lazy(() => import('./admin/Dashboard.tsx'));

export { Login, Register, Home, Shop, ProductDetails, Cart, Checkout, Payment, Dashboard };
