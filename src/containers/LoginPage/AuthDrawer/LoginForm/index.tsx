import {
  initialLoginFormValue,
  loginFormSchema,
  LoginFormType,
} from '@/containers/LoginPage/AuthDrawer/LoginForm/helpers';
import { LoginKey } from '@/queries/Auth/keys';
import { useGetUserInfo } from '@/queries/Auth/useGetUserInfo';
import { useLogin } from '@/queries/Auth/useLogin';
import { useAuthStore } from '@/zustand/auth/useAuthStore';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

function LoginForm() {
  const { setUser, setTokens } = useAuthStore();
  const { data: userInfo, onGetUserInfo } = useGetUserInfo();
  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.result;
      localStorage.setItem('accessToken', accessToken);
      setTokens(accessToken, refreshToken);

      if (accessToken) {
        alert(accessToken);
        onGetUserInfo();
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: initialLoginFormValue,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormType) => {
    onLogin(data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  };

  return (
    <div className="login">
      <strong>Sign in</strong>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={LoginKey.USERNAME}>
          Email <span>*</span>
        </label>
        <div className="login-input-group" style={{ color: 'black' }}>
          <i className="far fa-paper-plane"></i>
          <Controller
            name={LoginKey.USERNAME}
            control={control}
            render={({ field }) => (
              <input style={{ marginLeft: '5px' }} {...field} type="text" required />
            )}
          />
          {errors[LoginKey.USERNAME] && <span>{errors[LoginKey.USERNAME]?.message}</span>}
        </div>

        <label htmlFor={LoginKey.PASSWORD}>
          Password <span>*</span>
        </label>
        <div className="login-input-group" style={{ color: 'black' }}>
          <i className="fas fa-lock"></i>
          <Controller
            name={LoginKey.PASSWORD}
            control={control}
            render={({ field }) => (
              <input style={{ marginLeft: '5px' }} {...field} type="text" required />
            )}
          />
          {errors[LoginKey.PASSWORD] && <span>{errors[LoginKey.PASSWORD]?.message}</span>}
        </div>

        <div className="btns">
          <button type="submit">Login</button>
        </div>
        <a href="#!" className="forget">
          Forget your password?
        </a>
      </form>

      <div className="intro-text">
        <span>Welcome to this site</span>
      </div>
    </div>
  );
}

export default LoginForm;
