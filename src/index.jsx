import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';

import './global.css';

import { TitlePage } from './components/TitlePage';
import { HomePage } from './pages/HomePage';
import { OCRPage } from './pages/OCRPage';

import { Header } from './components/Header';
import { NavMobile } from './components/NavMobile';
import { NavPC } from './components/NavPC';
import { Footer } from './components/Footer';
import { StatsPage } from './pages/StatsPage';
import { SessionPage } from './pages/SessionPage';
import { useEffect } from 'react';

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

const ErrorPage = () => {
  const name = localStorage.getItem('userName');
  return (
    <div>
      <p>404: Tady nic není, vrať se zpět</p>
      <Link to={name ? '/HomePage' : '/'}>Zpět</Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <TitlePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/HomePage',
        element: <HomePage />,
      },
      {
        path: '/Session',
        element: <SessionPage />,
        children: [
          {
            path: '/Session/:sessionId',
            element: <SessionPage/>,
          }
        ]
      },
      {
        path: '/Stats',
        element: <StatsPage />,
      },
      {
        path: '/Menu',
        element: <OCRPage />,
      },
      {
        path: '/Menu/:sessionId',
        element: <OCRPage />,
      },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />,
);
