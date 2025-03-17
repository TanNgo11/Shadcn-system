import { OAuthConfig } from '@/config/OAuthConfig';
import { Auth } from '@/containers/LoginPage';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IMG from '../email.svg';
import './styles.css';
type MyComponentProps = {
  isAuth: Auth;
  setIsAuth: Dispatch<SetStateAction<Auth>>;
};
const Login = ({ isAuth, setIsAuth }: MyComponentProps) => {
  const navigate = useNavigate();
  const { accessTokenState } = useAuthStore();

  const handleClickToGoogleLogin = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl,
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    window.location.href = targetUrl;
  };

  useEffect(() => {
    if (accessTokenState) {
      navigate('/');
    }
  }, [accessTokenState, navigate]);

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
          </div>
          <span>Or via Social Media</span>
          <div className="login-via-social">
            <a onClick={handleClickToGoogleLogin} aria-label="Login with Google">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
