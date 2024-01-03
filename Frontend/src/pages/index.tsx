import { lazy } from 'react';
const Shop = lazy(() => import('./Shop.tsx'));
const Home = lazy(() => import('./Home.tsx'));
const Cart = lazy(() => import('./Cart.tsx'));

export { Shop, Home, Cart };
