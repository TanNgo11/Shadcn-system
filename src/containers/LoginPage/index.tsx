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
    if (localStorage.getItem('accessToken') && user?.id && user?.roles) {
      switch (user.roles[0]) {
        case Role.ADMIN:
          navigate(`/admin/profile/${user.id}`);
          break;
        case Role.STUDENT:
          navigate(`/student/profile/${user.id}`);
          break;
        case Role.TEACHER:
          navigate(`/teacher/profile/${user.id}`);
          break;
        default:
          navigate(`/404`);
          break;
      }
    }
  }, [user, navigate, Role.ADMIN, Role.STUDENT, Role.TEACHER]);

  return (
    <>
      <Login isAuth={isAuth} setIsAuth={setIsAuth} />
      <AuthDrawer isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  );
}

export default LoginPage;
