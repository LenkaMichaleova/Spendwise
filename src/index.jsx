import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';

import './global.css';
import { NavMobile } from './components/NavMobile';
import { Header } from './components/Header';
import { NavPC } from './components/NavPC';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <div className="app-main">
        <NavPC />
        <Outlet />
      </div>
      <NavMobile />
      <Footer />
    </>
  );
};

const Home = () => (
  <section>
    <h2>Home</h2>
    <p>Welcome</p>
  </section>
);

const Stats = () => (
  <section>
    <h2>Statistics</h2>
    <p>Some awesome graphs here</p>
  </section>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'statistics',
        element: <Stats />,
      },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
