import { lazy } from 'react';

const Login = lazy(() => import('./Login.tsx'));
const Register = lazy(() => import('./Register.tsx'));
const Home = lazy(() => import('./Home.tsx'));
const Shop = lazy(() => import('./Shop.tsx'));
const ProductDetails = lazy(() => import('./ProductDetails.tsx'));
const Cart = lazy(() => import('./Cart.tsx'));
const Checkout = lazy(() => import('./Checkout.tsx'));
const Payment = lazy(() => import('./Payment.tsx'));
const Dashboard = lazy(() => import('./admin/Dashboard.tsx'));

export { Login, Register, Home, Shop, ProductDetails, Cart, Checkout, Payment, Dashboard };
