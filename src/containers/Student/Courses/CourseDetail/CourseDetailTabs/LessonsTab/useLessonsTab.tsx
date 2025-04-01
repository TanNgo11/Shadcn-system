import { useNotification } from '@/containers/StartupContainers';
import { UpdateLessonPayload, useGetLessonsByCourseId } from '@queries/Lessons';
import { useUpdateLessonById } from '@queries/Lessons/useUpdateLessonById';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import WeekLessonContent from './WeekLessonContent';
import WeekLessonHeader from './WeekLessonHeader';

const useLessonsTab = () => {
  const toast = useNotification();
  const { courseId } = useParams();
  const { lessons, handleInvalidateTagsList } = useGetLessonsByCourseId({
    courseId: courseId,
  });
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const contentRefs = useRef<{
    [key: string]: React.RefObject<{ submit: () => any }>;
  }>({});
  Object.keys(editStates).forEach((lessonId) => {
    if (!contentRefs.current[lessonId]) {
      contentRefs.current[lessonId] = React.createRef();
    }
  });
  const { onUpdateLessonById } = useUpdateLessonById({
    onSuccess: () => {
      handleInvalidateTagsList();
      toast.success({
        message: 'update teacher information successfully',
        description: 'Teacher information has been updated successfully.',
      });
    },
    onError: () => {
      toast.error({
        message: 'update teacher information failed',
        description: 'Failed to update teacher information.',
      });
    },
  });

  const toggleEdit = (lessonId: string) => {
    setEditStates((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleSave = (lessonId: string, payload: UpdateLessonPayload) => {
    if (payload?.description === undefined || payload?.description?.trim() === '') {
      toast.error({ message: 'Description cannot be empty' });
      return;
    }
    const formData = new FormData();
    const { files, ...rest } = payload;

    formData.append(
      'request',
      JSON.stringify({
        id: Number(lessonId),
        ...rest,
      }),
    );
    if (files && files.length > 0) {
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj);
        } else {
          console.warn('File object missing originFileObj:', file);
        }
      });
    } else {
      console.warn('No files provided');
    }

    onUpdateLessonById(formData);
    toggleEdit(lessonId);
  };

  const lessonItems = lessons?.map((lesson) => ({
    id: String(lesson?.id),
    label: (
      <WeekLessonHeader
        title={lesson?.title}
        isEdit={editStates[String(lesson?.id)] || false}
        toggleEdit={() => toggleEdit(String(lesson?.id))}
        onSave={(payload) => handleSave(String(lesson?.id), payload)}
        submitRef={contentRefs.current[String(lesson?.id)]}
      />
    ),
    children: (
      <WeekLessonContent
        ref={contentRefs.current[String(lesson?.id)]}
        lesson={lesson}
        isEdit={editStates[String(lesson?.id)] || false}
        toggleEdit={() => toggleEdit(String(lesson?.id))}
      />
    ),
  }));

  return {
    states: {
      lessons,
      lessonItems,
    },
    handlers: {},
  };
};

export default useLessonsTab;
