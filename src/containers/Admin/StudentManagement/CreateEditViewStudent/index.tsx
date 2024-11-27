import { useGetStudentById } from '@/queries/Students/useGetStudentById';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  initStudentValue,
  StudentPayload,
  studentRegisterFormSchema,
  StudentResponse,
} from './helper';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateNewStudent } from '@/queries/Students/useCreateNewStudent';
import { CreateStudentPayload } from '@/queries/Students/types';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { Gender } from '../../components/types';
export interface Props {}

const CreateEditViewStudent: React.FC<Props> = () => {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const studentId = id || '';
  const { student } = useGetStudentById({ id: studentId });
  const { onCreateStudent } = useCreateNewStudent({
    onSuccess: () => {
      toast.success({
        message: 'Create student successfully',
        description: 'Hello World!',
      });
      navigate(-1);
    },
    onError: () => {
      toast.error({
        message: 'Create student failed',
        description: 'Please try again!',
      });
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
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
  }, [student, reset]);

  const onSubmit = (data: CreateStudentPayload) => {
    if (!id) {
      onCreateStudent(data);
    }
    console.log(data);
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
                  name="repassword"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} type="password" placeholder="Confirm password" />
                      {errors.repassword && (
                        <Typography.Text type="danger">{errors.repassword.message}</Typography.Text>
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
                      onChange={(date, dateString) => field.onChange(dateString)}
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
          {/* <Col span={8}>
            <Form.Item label="School Year">
              <Controller
                name="schoolYear"
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
                    {errors.schoolYear && (
                      <Typography.Text type="danger">{errors.schoolYear.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}>
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
