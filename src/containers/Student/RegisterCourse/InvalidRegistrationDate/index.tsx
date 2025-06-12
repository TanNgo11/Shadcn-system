import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, Result } from 'antd';
import { CalendarX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InvalidRegistrationDatePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      title="It's not the time to register courses."
      extra={
        <Button type="primary" key="console" onClick={() => navigate('/student/dashboard')}>
          Go to Dashboard
        </Button>
      }
    />
  );
};
