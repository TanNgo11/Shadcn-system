import { useForm } from 'react-hook-form';
import {
  formatToTeacherReferencePayload,
  initialTeacherReferenceFormValue,
  TeacherReferenceFormValue,
} from './helpers';
import { useEffect, useState } from 'react';
import { useUpdateTeacherReference } from '@queries/Courses/useUpdateTeacherReference';
import { useNotification } from '@/containers/StartupContainers';
import { useGetCourseDetail as useGetCourseDetailQuery } from '@/queries/Courses/useGetCourseDetail';
import { useParams } from 'react-router-dom';

type UseTeacherInformationProps = {
  id: number;
  contactLink: string;
  officeLocation: string;
  officeHours: string;
  otherInformation: string;
};

const useTeacherInformation = ({
  id,
  contactLink,
  officeLocation,
  officeHours,
  otherInformation,
}: UseTeacherInformationProps) => {
  const toast = useNotification();
  const { courseId } = useParams();
  const { handleInvalidateTeachersList } = useGetCourseDetailQuery({
    courseId: courseId,
  });
  const [isEdit, setIsEdit] = useState(false);
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TeacherReferenceFormValue>({
    defaultValues: initialTeacherReferenceFormValue,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset({
      id,
      contactLink,
      officeLocation,
      officeHours,
      otherInformation,
    });
  }, [contactLink, officeLocation, officeHours, otherInformation, reset, id]);

  const { onUpdateTeacherReference, isLoading } = useUpdateTeacherReference({
    onSuccess: () => {
      handleInvalidateTeachersList();
      toast.success({
        message: 'update teacher information successfully',
        description: 'You have successfully update teacher information.',
      });
    },
    onError: () => {
      toast.error({
        message: 'update teacher information failed',
        description: 'There was an error while updating teacher information.',
      });
    },
  });

  const onSubmit = (data: TeacherReferenceFormValue) => {
    const payload = formatToTeacherReferencePayload({
      ...data,
      id,
    });
    onUpdateTeacherReference(payload);
    setIsEdit(false);
  };

  return {
    states: {
      control,
      errors,
      isLoading,
      isEdit,
    },
    handlers: {
      onSubmit: handleSubmit(onSubmit),
      setIsEdit,
    },
  };
};

export default useTeacherInformation;
