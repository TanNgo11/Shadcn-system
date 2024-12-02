import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useCreateNewTeacher } from '@/queries/Teachers/useCreateNewTeacher';
import { useGetTeacherById } from '@/queries/Teachers/useGetTeacherById';
import { useGetTeachersList } from '@/queries/Teachers/useGetTeachersList';
import { useUpdateTeacher } from '@/queries/Teachers/useUpdateTeacher';
import { Gender } from '@/zustand/auth/types';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { initTeacherValue, TeacherPayload, teacherRegisterFromSchema } from './helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { CrudTeacherPayload } from '@/queries/Teachers/types';
import dayjs from 'dayjs';

const CreateEditViewTeacher: React.FC = () => {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const teacherId = id || '';
  const { teacher, handleInvalidTeacherById } = useGetTeacherById({ id: teacherId });
  const { handleInvalidateTeachersList } = useGetTeachersList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  // The useCreateNewTeacher hook is used to create a new teacher
  const { onCreateTeacher, error } = useCreateNewTeacher({
    onSuccess: () => {
      toast.success({
        message: 'Create teacher successfully',
        description: 'You have successfully created a new teacher.',
      });
      handleInvalidateTeachersList({
        current: 1,
        pageSize: 10,
      });
      handleInvalidTeacherById();
      navigate(-1);
    },
    onError: (error: any) => {
      const errorMessage =
        (error as any)?.response?.data?.message || 'An unexpected error occurred.';
      if ((error as any)?.response?.data?.code !== 1000) {
        toast.error({
          message: 'Create teacher failed',
          description: errorMessage,
        });
      }
    },
  });

  // The useUpdateTeacher hook is used to update a teacher
  const { onUpdateTeacher, error: updateError } = useUpdateTeacher({
    onSuccess: () => {
      toast.success({
        message: 'Update teacher successfully',
        description: 'You have successfully updated the teacher.',
      });
      handleInvalidateTeachersList({
        current: 1,
        pageSize: 10,
      });
      handleInvalidTeacherById();
      navigate(-1);
    },
    onError: (error: any) => {
      const errorMessage =
        (error as any)?.response?.data?.message || 'An unexpected error occurred.';
      if ((error as any)?.response?.data?.code !== 1000) {
        toast.error({
          message: 'Update teacher failed',
          description: errorMessage,
        });
      }
    },
  });

  // We define this function to handle the form submissionv
  // Initialize form control and validation using react-hook-form and zod
  const {
    control, // The control object is used to register the form fields
    handleSubmit,
    formState: { errors, isDirty }, // The formState means the state of the form | isDirty is a boolean value that indicates whether the form has been modified
    reset, // The reset function is used to reset the form to its initial state
  } = useForm<TeacherPayload>({
    mode: 'onChange', // The mode option is set to 'onChange' to validate the form when the input value changes
    reValidateMode: 'onChange', // The reValidateMode option is set to 'onChange' to re-validate the form when the input value changes
    defaultValues: initTeacherValue,
    resolver: zodResolver(teacherRegisterFromSchema),
  });

  // The useSubmit function is called when the form is submitted
  //
  useEffect(() => {
    if (id) {
      reset({ ...teacher, id: Number(teacherId) });
    }
  }, [teacher, reset]);

  const onSubmit = (data: CrudTeacherPayload) => {
    if (!id) {
      onCreateTeacher(data);
    } else {
      console.log('data: ', data);
      onUpdateTeacher({ id: Number(teacherId), data });
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Card title="Account Information" bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Username">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter username" />
                    {errors.username && (
                      <Typography.Text type="danger">{errors.username.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter email" />
                    {errors.email && (
                      <Typography.Text type="danger">{errors.email.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        {id ? null : (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Password">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} type="password" placeholder="Enter password" />
                      {errors.password && (
                        <Typography.Text type="danger">{errors.password.message}</Typography.Text>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Confirmation Password">
                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} type="password" placeholder="Confirm password" />
                      {errors.rePassword && (
                        <Typography.Text type="danger">{errors.rePassword.message}</Typography.Text>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Card>
      <Card title="Profile Information" bordered={false} style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="First Name">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter first name" />
                    {errors.firstName && (
                      <Typography.Text type="danger">{errors.firstName.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Last Name">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter last name" />
                    {errors.lastName && (
                      <Typography.Text type="danger">{errors.lastName.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Gender">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <>
                    <Select {...field} placeholder="Select gender">
                      <Select.Option value="MALE">{Gender.MALE}</Select.Option>
                      <Select.Option value="FEMALE">{Gender.FEMALE}</Select.Option>
                      <Select.Option value="OTHER">{Gender.OTHER}</Select.Option>
                    </Select>
                    {errors.gender && (
                      <Typography.Text type="danger">{errors.gender.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Phone Number">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter phone number" />
                    {errors.phoneNumber && (
                      <Typography.Text type="danger">{errors.phoneNumber.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Date of Birth">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      placeholder="Select date of birth"
                      format="DD-MM-YYYY"
                      style={{ width: '100%' }}
                      value={field.value ? dayjs(field.value, 'DD-MM-YYYY') : null}
                      onChange={(_date: any, dateString: any) => field.onChange(dateString)}
                    />
                    {errors.dateOfBirth && (
                      <Typography.Text type="danger">{errors.dateOfBirth.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Department">
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter department ID" />
                    {errors.departmentId && (
                      <Typography.Text type="danger">{errors.departmentId.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Emergency Contact Phone Number">
              <Controller
                name="emergencyContactPhoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter emergency contact phone number" />
                    {errors.emergencyContactPhoneNumber && (
                      <Typography.Text type="danger">
                        {errors.emergencyContactPhoneNumber.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Phone Number">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter guardian phone number" />
                    {errors.phoneNumber && (
                      <Typography.Text type="danger">{errors.phoneNumber.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Address">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter address" />
                    {errors.address && (
                      <Typography.Text type="danger">{errors.address.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit">
              {teacherId ? 'Update' : 'Create'}
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateEditViewTeacher;
