import { useNotification } from '@/containers/StartupContainers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateConstraint } from '@queries/Courses';
import { UpdateConstrainPayload } from '@queries/Courses/types';
import { Form, InputNumber, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CourseResponse } from '../../../CourseManagement/helpers';
import { constrainFormSchema, initialConstraintValue } from './EditConstraintModal.helpers';

interface Props {
  open: boolean;
  onCancel: () => void;
  course?: CourseResponse;
}

const EditConstraintModal: React.FC<Props> = ({ open, onCancel, course }) => {
  const toast = useNotification();

  const { isLoading, onUpdateConstraint } = useUpdateConstraint({
    onSuccess: () => {
      toast.success({
        message: 'Update student successfully',
        description: 'You have successfully updated the student.',
      });
    },
    onError: (error) => {
      toast.error({
        message: 'Update student failed',
        description: error.message,
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateConstrainPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialConstraintValue,
    resolver: zodResolver(constrainFormSchema),
  });
  useEffect(() => {
    console.log('🚀 ~ errors:', errors);
  }, [errors]);

  const onSubmit = (data: UpdateConstrainPayload) => {
    console.log('hehe');

    if (isEmpty(course)) return;
    console.log('huhu');

    const payload: UpdateConstrainPayload = {
      ...data,
      courseId: Number(course?.id),
    };
    onUpdateConstraint(payload);
    onCancel();
  };

  return (
    <Modal
      open={open}
      title="Edit Course Constraint"
      onCancel={onCancel}
      destroyOnClose
      okText="Save"
      confirmLoading={isLoading}
      onOk={handleSubmit(onSubmit)}
    >
      <Form layout="vertical">
        <Form.Item
          label="Number of Timetables"
          name="numsOfTimetable"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Controller
            name="numsOfTimetable"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                style={{ width: '100%' }}
                placeholder="Enter number of timetables"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Max Students"
          name="maxStudents"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Controller
            name="maxStudents"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                style={{ width: '100%' }}
                placeholder="Enter max students"
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditConstraintModal;
