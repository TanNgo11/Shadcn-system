import { Flex, Spin } from "antd";

function LoadingContainer() {
  return (
    <Flex gap="middle" vertical>
      <Flex gap="middle">
        <Spin tip="Loading" size="large"></Spin>
      </Flex>
    </Flex>
  );
}

export default LoadingContainer;
