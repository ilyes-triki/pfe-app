import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage.js';
import AdminPanel from './Pages/AdminPanel/AdminPanel.js';
import HomePage from './Pages/HomePage/HomePage.js';
import NotFound from './Pages/notFoundPage/NotFound.js';
import Footer from './elements/footer/Footer.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/Login',
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/Admin',
    element: <AdminPanel />,
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
