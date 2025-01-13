import AuthDrawer from '@/containers/LoginPage/AuthDrawer';
import Login from '@/containers/LoginPage/Login';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type Auth = {
  open: boolean;
  form: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const Role = {
    ADMIN: 'ADMIN',
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
  };
  const [isAuth, setIsAuth] = useState({ open: false, form: 'login' });
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      switch (user?.roles?.[0]) {
        case Role.ADMIN:
          navigate('/admin/profile');
          break;
        case Role.STUDENT:
          navigate('/student/profile');
          break;
        default:
          navigate('/teacher/profile');
          break;
      }
    }
  }, []);

  return (
    <>
      <Login isAuth={isAuth} setIsAuth={setIsAuth} />
      <AuthDrawer isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  );
}

export default LoginPage;
