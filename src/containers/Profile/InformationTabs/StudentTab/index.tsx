import { Descriptions } from 'antd';

const UserInfo = () => {
  return (
    <Descriptions
      title="User Info"
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
      }}
    >
      <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
      <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
      <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
      <Descriptions.Item label="Remark">empty</Descriptions.Item>
      <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
      <Descriptions.Item label="Max SV">123456789</Descriptions.Item>
      <Descriptions.Item label="Phone Number">0987654321</Descriptions.Item>
      <Descriptions.Item label="ID Number">A123456789</Descriptions.Item>
      <Descriptions.Item label="Gender">Male</Descriptions.Item>
      <Descriptions.Item label="Date of Birth">1990-01-01</Descriptions.Item>
      <Descriptions.Item label="Email">zhou.maomao@example.com</Descriptions.Item>
      <Descriptions.Item label="Nationality">Chinese</Descriptions.Item>
      <Descriptions.Item label="Major">Computer Science</Descriptions.Item>
      <Descriptions.Item label="Enrollment Year">2010</Descriptions.Item>
      <Descriptions.Item label="Graduation Year">2014</Descriptions.Item>
    </Descriptions>
  );
};

export default UserInfo;
