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
      <Typography.Title level={5}>{title}</Typography.Title>
    </div>
  );
};

export default WeekLessonHeader;
