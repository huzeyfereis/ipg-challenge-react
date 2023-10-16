import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/homepage',
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
