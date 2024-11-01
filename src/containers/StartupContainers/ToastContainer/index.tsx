import { notification, NotificationArgsProps } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';
import { createContext, useContext } from 'react';

const defaultNotificationInstance: NotificationInstance = {
  success: function (args: NotificationArgsProps): void {
    throw new Error('Function not implemented.');
  },
  error: function (args: NotificationArgsProps): void {
    throw new Error('Function not implemented.');
  },
  info: function (args: NotificationArgsProps): void {
    throw new Error('Function not implemented.');
  },
  warning: function (args: NotificationArgsProps): void {
    throw new Error('Function not implemented.');
  },
  open: function (args: NotificationArgsProps): void {
    throw new Error('Function not implemented.');
  },
  destroy: function (key?: React.Key): void {
    throw new Error('Function not implemented.');
  },
};
const NotificationContext = createContext<NotificationInstance>(defaultNotificationInstance);

import { ReactNode } from 'react';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
