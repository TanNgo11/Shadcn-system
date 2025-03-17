import {
  initialLoginFormValue,
  loginFormSchema,
  LoginFormType,
} from '@/containers/LoginPage/AuthDrawer/LoginForm/helpers';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { LoginKey } from '@/queries/Auth/types';

import { useGetUserInfo } from '@/queries/Auth/useGetUserInfo';
import { useLogin } from '@/queries/Auth/useLogin';
import { Role } from '@/zustand/auth/types';
import { useAuthStore } from '@/zustand/auth/useAuthStore';

import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const toast = useNotification();
  const { setTokens, setUser } = useAuthStore();
  const { onGetUserInfo } = useGetUserInfo({
    enabled: false,
    onSuccess: (data) => {
      setUser(data);
      toast.success({
        message: 'Login successfully',
        description: 'Welcome back!',
      });

      switch (data?.roles?.[0]) {
        case Role.ADMIN:
          navigate('/admin/profile');
          break;
        case Role.STUDENT:
          navigate('/student/profile/' + data?.id);
          break;
        default:
          navigate('/teacher/profile/' + data?.id);
          break;
      }
    },
    onError: (error) => {
      toast.error({
        message: 'Get user info failed',
        description: 'Please try again.',
      });
    },
  });

  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.result;
      localStorage.setItem('accessToken', accessToken);
      setTokens(accessToken, refreshToken);
      if (accessToken) {
        onGetUserInfo();
      }
    },
    onError: (error) => {
      toast.error({
        message: 'Login failed',
        description: 'Please check your username and password again.',
      });
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
        </div>
        {errors[LoginKey.USERNAME] && (
          <Typography.Text type="danger">{errors[LoginKey.USERNAME]?.message}</Typography.Text>
        )}

        <label htmlFor={LoginKey.PASSWORD}>
          Password <span>*</span>
        </label>
        <div className="login-input-group" style={{ color: 'black' }}>
          <i className="fas fa-lock"></i>
          <Controller
            name={LoginKey.PASSWORD}
            control={control}
            render={({ field }) => (
              <input style={{ marginLeft: '5px' }} {...field} type="password" required />
            )}
          />
        </div>
        {errors[LoginKey.PASSWORD] && (
          <Typography.Text type="danger">{errors[LoginKey.PASSWORD]?.message}</Typography.Text>
        )}

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
