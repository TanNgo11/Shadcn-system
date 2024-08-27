import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Flex, Menu, MenuProps, Row, theme } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { FC, useState } from 'react';
type Props = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};
const NavBar: FC<Props> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
  type MenuItem = Required<MenuProps>['items'][number];
  const items2: MenuItem[] = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            { label: 'Option 1', key: 'setting:1' },
            { label: 'Option 2', key: 'setting:2' },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            { label: 'Option 3', key: 'setting:3' },
            { label: 'Option 4', key: 'setting:4' },
          ],
        },
      ],
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
  ];
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row>
        <Col className="gutter-row" span={2}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Search placeholder="input search text" enterButton />
          </div>
        </Col>

        <Col className="gutter-row" span={16} style={{ textAlign: 'right' }}>
          <Flex style={{ height: '100%', marginRight: '16px' }} justify="flex-end" align="center">
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items2} />
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar
                shape="circle"
                style={{
                  outline: 'none',
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                }}
                size="large"
                src={
                  <img
                    src={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Mu8ohI_e0DT8-XOAkO3FNwbu416-eHL1TQ&s'
                    }
                    alt="avatar"
                  />
                }
              />
            </Dropdown>
          </Flex>
        </Col>
      </Row>
    </Header>
  );
};

export default NavBar;
