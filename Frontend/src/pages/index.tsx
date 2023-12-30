import { lazy } from 'react';
const Search = lazy(() => import('./Search.tsx'));
const Home = lazy(() => import('./Home.tsx'));
const Cart = lazy(() => import('./Cart.tsx'));

export { Search, Home, Cart };
