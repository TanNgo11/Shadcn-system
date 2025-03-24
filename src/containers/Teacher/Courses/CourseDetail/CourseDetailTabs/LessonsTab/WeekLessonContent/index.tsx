import { LessonResponse } from '@queries/Lessons';
import { Typography, Input } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type WeekLessonContentProps = {
  lesson: LessonResponse;
  isEdit: boolean;
  toggleEdit: () => void;
};

type WeekLessonContentRef = {
  submit: () => string | undefined;
};

const WeekLessonContent = forwardRef<WeekLessonContentRef, WeekLessonContentProps>(
  ({ lesson, isEdit, toggleEdit }, ref) => {
    const { TextArea } = Input;
    const [description, setDescription] = useState(lesson?.description || '');

    useImperativeHandle(ref, () => ({
      submit: () => description,
    }));

    return (
      <>
        {isEdit ? (
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Enter description"
          />
        ) : (
          <Typography.Text>{lesson?.description}</Typography.Text>
        )}
      </>
    );
  },
);

WeekLessonContent.displayName = 'WeekLessonContent';

export default WeekLessonContent;
