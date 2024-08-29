import { Auth } from '@/containers/LoginPage';
import { Dispatch, SetStateAction } from 'react';
import IMG from '../email.svg';
import './styles.css';
type MyComponentProps = {
  isAuth: Auth;
  setIsAuth: Dispatch<SetStateAction<Auth>>;
};
const Login = ({ isAuth, setIsAuth }: MyComponentProps) => {
  return (
    <div id="login-Home" className={`${isAuth.open ? 'active' : ''}`}>
      <div className="login-container">
        <div className="login-img">
          <img src={IMG} alt="IMG" />
        </div>

        <div className="login-text-btns">
          <p>Welcome to my website</p>

          <div className="login-btns">
            <a
              href="#!"
              className="login-login-btn"
              onClick={() => setIsAuth({ open: true, form: 'login' })}
            >
              Login
            </a>

            <a
              href="#!"
              className="login-register-btn"
              onClick={() => setIsAuth({ open: true, form: 'register' })}
            >
              Register
            </a>
          </div>
          <span>Or via Social Media</span>
          <div className="login-via-social">
            <a>
              <i className="fab fa-facebook-f"></i>
            </a>

            <a>
              <i className="fab fa-google"></i>
            </a>

            <a href="">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
