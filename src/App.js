import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage.js';
import AdminPanel from './Pages/AdminPanel/AdminPanel.js';
import HomePage from './Pages/HomePage/HomePage.js';
import NotFound from './Pages/notFoundPage/NotFound.js';
import WithNavbar from './HOC/Hoc.js';

let AdminWithNavbar = WithNavbar(AdminPanel);
let LoginWithNavbar = WithNavbar(LoginPage);
let ErrorWithNavbar = WithNavbar(NotFound);

const router = createHashRouter([
  {
    path: '/',
    element: HomePage(),
    errorElement: ErrorWithNavbar(),
  },
  {
    path: '/Login',
    element: LoginWithNavbar(),

    errorElement: ErrorWithNavbar(),
  },
  {
    path: '/Admin',
    element: AdminWithNavbar(),

    errorElement: ErrorWithNavbar(),
  },
]);

/**
 * A function component representing the main App.
 *
 * @return {JSX.Element} The JSX element of the App component.
 */
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
