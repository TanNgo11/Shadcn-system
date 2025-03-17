import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useGetUserInfo } from '@queries/Auth/useGetUserInfo';
import { Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../StartupContainers';
import { Role } from '@/zustand/auth/types';

export default function GoogleAuthenticate() {
  const toast = useNotification();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const { setUser, setTokens } = useAuthStore();
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

  useEffect(() => {
    const fetchAuthToken = async (authCode: string) => {
      try {
        const response = await fetch(
          `http://localhost:8080/identity/api/v1/auth/outbound/authenticate?code=${authCode}`,
          {
            method: 'POST',
          },
        );
        const data = await response.json();
        return data.result;
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };

    const processAuthentication = async () => {
      const authCodeRegex = /code=([^&]+)/;
      const isMatch = window.location.href.match(authCodeRegex);

      if (isMatch) {
        const authCode = isMatch[1];
        const response = await fetchAuthToken(authCode);

        if (response) {
          const accessToken = response.accessToken;
          const refreshToken = response.refreshToken;
          localStorage.setItem('accessToken', accessToken);
          setIsLogged(true);
          setTokens(accessToken, refreshToken);

          onGetUserInfo();
        }
      }
    };

    processAuthentication();
  }, [setUser, setTokens, onGetUserInfo]);

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin />
      <Typography.Text>Authenticating...</Typography.Text>
    </div>
  );
}
