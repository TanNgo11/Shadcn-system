import { Button } from '@/components/ui/button';
import { Result } from 'antd';

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button className="bg-primary hover:caret-blue-500 hover:bg-white" variant={'outline'}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFoundPage;
