import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { CRUStudentPayload } from '@/queries/Students/types';
import { useCreateNewStudent } from '@/queries/Students/useCreateNewStudent';
import { useGetStudentById } from '@/queries/Students/useGetStudentById';
import { useGetStudentsList } from '@/queries/Students/useGetStudentsList';
import { useUpdateStudent } from '@/queries/Students/useUpdateStudent';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Gender } from '../../../components/types';
import { initStudentValue, StudentPayload, studentRegisterFormSchema } from './helper';

const CreateEditViewStudent: React.FC = () => {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const studentId = id || '';
  const { student, handleInvalidStudentById } = useGetStudentById({ id: studentId });
  const { handleInvalidateStudentsList } = useGetStudentsList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });
  const { onCreateStudent } = useCreateNewStudent({
    onSuccess: () => {
      toast.success({
        message: 'Create student successfully',
        description: 'You have successfully created a new student.',
      });
      handleInvalidateStudentsList();
      navigate(-1);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message ?? 'An unexpected error occurred.';
      if (error?.response?.data?.code !== 1000) {
        toast.error({
          message: 'Create student failed',
          description: errorMessage,
        });
      }
    },
  });
  const { onUpdateStudent } = useUpdateStudent({
    onSuccess: () => {
      toast.success({
        message: 'Update student successfully',
        description: 'You have successfully updated the student.',
      });
      handleInvalidateStudentsList();
      handleInvalidStudentById();
      navigate(-1);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message ?? 'An unexpected error occurred.';
      if (error?.response?.data?.code !== 1000) {
        toast.error({
          message: 'Update student failed',
          description: errorMessage,
        });
      }
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initStudentValue,
    resolver: zodResolver(studentRegisterFormSchema),
  });

  useEffect(() => {
    if (id) {
      reset({ ...student, id: Number(studentId) });
    }
  }, [student, reset, id, studentId]);

  const onSubmit = (data: CRUStudentPayload) => {
    if (!id) {
      onCreateStudent(data);
    } else {
      onUpdateStudent({ id: Number(studentId), data });
    }
  };

  const generateAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - (currentYear % 4);
    const years = [];
    for (let i = startYear; i >= 2000; i -= 4) {
      years.push(`${i}-${i + 4}`);
    }
    return years;
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Card title="Account Information">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Username">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <>
                    <Input disabled={true} {...field} placeholder="Enter username" />
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
            <Form.Item label="Middle Name">
              <Controller
                name="middleName"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter middle name" />
                    {errors.middleName && (
                      <Typography.Text type="danger">{errors.middleName.message}</Typography.Text>
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
          <Col span={8}>
            <Form.Item label="Enrollment Date">
              <Controller
                name="enrollmentDate"
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      placeholder="Select date"
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
                      value={field.value ? dayjs(field.value, 'DD-MM-YYYY') : null}
                      onChange={(_date: any, dateString: any) => field.onChange(dateString)}
                    />
                    {errors.enrollmentDate && (
                      <Typography.Text type="danger">
                        {errors.enrollmentDate.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Degree Level">
              <Controller
                name="degreeLevel"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter Degree Level" />
                    {errors.degreeLevel && (
                      <Typography.Text type="danger">{errors.degreeLevel.message}</Typography.Text>
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
          <Col span={8}>
            <Form.Item label="Academic Year">
              <Controller
                name="academicYearId"
                control={control}
                render={({ field }) => (
                  <>
                    <Select {...field} placeholder="Select academic year">
                      {generateAcademicYears().map((year) => (
                        <Select.Option key={year} value={year}>
                          {year}
                        </Select.Option>
                      ))}
                    </Select>
                    {errors.academicYearId && (
                      <Typography.Text type="danger">
                        {errors.academicYearId.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
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
          <Col span={8}>
            <Form.Item label="Guardian Name">
              <Controller
                name="guardianName"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter guardian name" />
                    {errors.guardianName && (
                      <Typography.Text type="danger">{errors.guardianName.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Guardian Phone Number">
              <Controller
                name="guardianPhoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter guardian phone number" />
                    {errors.guardianPhoneNumber && (
                      <Typography.Text type="danger">
                        {errors.guardianPhoneNumber.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Nationality">
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter nationality" />
                    {errors.nationality && (
                      <Typography.Text type="danger">{errors.nationality.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Religion">
              <Controller
                name="religion"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter religion" />
                    {errors.religion && (
                      <Typography.Text type="danger">{errors.religion.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Date of birth">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      placeholder="Select date"
                      style={{ width: '100%' }}
                      format="DD-MM-YYYY"
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
        </Row>
        <Row gutter={16}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit">
              {id ? 'Update' : 'Create'}
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateEditViewStudent;
