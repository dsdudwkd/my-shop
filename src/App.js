import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
