import { Auth } from '@/containers/LoginPage';
import { Dispatch, SetStateAction } from 'react';
import './styles.css';
import LoginForm from '@/containers/LoginPage/AuthDrawer/LoginForm';
import UserRegisterForm from '@/containers/LoginPage/AuthDrawer/UserRegisterForm';
type MyComponentProps = {
  isAuth: Auth;
  setIsAuth: Dispatch<SetStateAction<Auth>>;
};

function AuthDrawer({ isAuth, setIsAuth }: MyComponentProps) {
  const switchToLogin = () => {
    setIsAuth({ open: true, form: 'login' });
  };
  return (
    <div id="Auth" className={`${isAuth.open ? 'show' : ''}`}>
      <a href="#!" className="close" onClick={() => setIsAuth({ ...isAuth, open: false })}>
        <i className="fas fa-times"></i>
      </a>
      <div className="content">
        {isAuth.form === 'login' && <LoginForm />}
        {isAuth.form === 'register' && <UserRegisterForm switchToLogin={switchToLogin} />}
      </div>
    </div>
  );
}

export default AuthDrawer;
