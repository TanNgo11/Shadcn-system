import { Button, Dropdown, Space, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import React from 'react';
import type { MenuProps } from 'antd';
import cn from 'classnames';

export interface Action {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  labelStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

interface ActionDialogProps {
  actions: Action[];
  dialogClassName?: string;
}

const ActionDialog: React.FC<ActionDialogProps> = ({ actions, dialogClassName }) => {
  if (actions.length < 3) {
    return (
      <Space className={cn(dialogClassName)}>
        {actions.map((action) => (
          <Tooltip key={action.key} title={action.label}>
            <Button
              type="link"
              icon={action.icon}
              onClick={action.onClick}
              style={action.iconStyle}
            />
          </Tooltip>
        ))}
      </Space>
    );
  }

  const items: MenuProps['items'] = actions.map((action) => ({
    key: action.key,
    label: <span style={action.labelStyle}>{action.label}</span>,
    icon: action.icon ? <span style={action.iconStyle}>{action.icon}</span> : undefined,
    onClick: action.onClick,
  }));

  return (
    <Dropdown menu={{ items }} trigger={['click']} overlayClassName={cn(dialogClassName)}>
      <Button type="link" icon={<MoreOutlined style={{ fontSize: '18px', color: 'black' }} />} />
    </Dropdown>
  );
};

export default ActionDialog;
