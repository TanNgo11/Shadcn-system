import React from 'react';
import { Input } from 'antd'; // Assuming you're using Ant Design
import { MessageInputProps } from '@chatscope/chat-ui-kit-react';

const CustomMessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder,
}) => {
  return (
    <div className="cs-message-input">
      <div className="cs-message-input__content">
        <Input value={value} placeholder={placeholder} style={{ width: '100%' }} />
        <button disabled={!value} className="cs-message-input__send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomMessageInput;
