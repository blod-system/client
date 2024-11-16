import { Suspense, useEffect } from 'react';
import './index.css';
import Header from './pages/Header/index';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Menu from './pages/Menu/index';
import { routerMap } from './routes/routerMap';
import { useUserStore } from './store/userStore';
import { BrowserRouter } from 'react-router-dom';
import Footer from './pages/Footer';

export default function App() {
  const getUserInfo = useUserStore(i => i.getUserInfo);

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (
    <BrowserRouter>
      <main className='h-dvh'>
        <Header />
        <Menu />
        <div className='w-5/6 mx-auto h-4/5 overflow-y-auto'>
          <Suspense fallback={<div>Loading ...</div>}>
            <Routes>
              {routerMap.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  Component={item.component}
                />
              ))}
              <Route
                path="*"
                element={<Navigate to="" />}
              />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  )
}