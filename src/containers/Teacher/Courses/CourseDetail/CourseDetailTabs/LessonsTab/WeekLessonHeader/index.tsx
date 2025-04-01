import { UpdateLessonPayload } from '@queries/Lessons';
import { Button, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';

type WeekLessonHeaderProps = {
  title: string;
  isEdit: boolean;
  toggleEdit: () => void;
  onSave: (payload: UpdateLessonPayload) => void;
  submitRef: React.RefObject<{ submit: () => any }>;
};

const WeekLessonHeader = ({
  title,
  isEdit,
  toggleEdit,
  onSave,
  submitRef,
}: WeekLessonHeaderProps) => {
  const [titleValue, setTitleValue] = useState(title || '');
  const handleSave = () => {
    const payload = submitRef.current?.submit();

    onSave({
      ...payload,
      title: titleValue,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {isEdit ? (
        <Input
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          style={{ width: '300px' }}
          placeholder="Enter title"
        />
      ) : (
        <Typography.Title level={5}>{title}</Typography.Title>
      )}
      {isEdit ? (
        <Space>
          <Button onClick={toggleEdit}>Cancel</Button>
          <Button type="primary" onClick={handleSave} style={{ marginRight: 8 }}>
            Save
          </Button>
        </Space>
      ) : (
        <Button onClick={toggleEdit}>Edit</Button>
      )}
    </div>
  );
};

export default WeekLessonHeader;
