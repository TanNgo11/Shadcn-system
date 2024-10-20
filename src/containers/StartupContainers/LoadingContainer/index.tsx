import { Flex, Spin } from 'antd';
import './styles.scss';

function LoadingContainer() {
  return (
    <Flex gap="middle" vertical className="loading-container">
      <Flex gap="middle">
        <Spin tip="Loading" size="large" />
      </Flex>
    </Flex>
  );
}

export default LoadingContainer;
