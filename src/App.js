import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav.jsx';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import GlobalStyle from './style/GlobalStyle.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//라이브러리의 쿼리 변경에 대한 기본 설정값
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyle />
          <Nav />
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
