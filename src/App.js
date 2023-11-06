import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav.jsx';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <>
    <AuthContextProvider>
      <Nav />
      <Outlet />
    </AuthContextProvider>
    </>
  );
}

export default App;
