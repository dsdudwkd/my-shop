import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav.jsx';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import GlobalStyle from './style/GlobalStyle.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllProduct from './pages/AllProduct.jsx';

//라이브러리의 쿼리 변경에 대한 기본 설정값
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyle />
          <Nav />
          <Routes>
            <Route path='/' element={<AllProduct />} />
          </Routes>
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
