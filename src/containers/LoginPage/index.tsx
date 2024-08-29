import AuthDrawer from '@/containers/LoginPage/AuthDrawer';
import Login from '@/containers/LoginPage/Login';
import { useState } from 'react';

export type Auth = {
  open: boolean;
  form: string;
};

function LoginPage() {
  const [isAuth, setIsAuth] = useState({ open: false, form: 'login' });

  return (
    <>
      <Login isAuth={isAuth} setIsAuth={setIsAuth} />
      <AuthDrawer isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  );
}

export default LoginPage;
