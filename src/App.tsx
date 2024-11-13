import { Suspense, useEffect } from 'react';
import './index.css';
import Header from './component/Header/index';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Menu from './component/Menu/index';
import { routerMap } from './routes/routerMap';
import Footer from './component/Footer';
import { useUserStore } from './store/userStore';
export default function App() {
  const user = useUserStore();
  const { getUserInfo } = user
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])
  return (
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
  )
}