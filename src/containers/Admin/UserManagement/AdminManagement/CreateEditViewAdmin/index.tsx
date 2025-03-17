import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { CRUAdminPayload } from '@/queries/Admins/types';
import { useCreateNewAdmin } from '@/queries/Admins/useCreateNewAdmin';
import { useGetAdminById } from '@/queries/Admins/useGetAdminById';
import { useGetAdminsList } from '@/queries/Admins/useGetAdminsList';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Gender } from '../../../components/types';
import { initAdminValue, AdminPayload, adminRegisterFormSchema } from './helper';
import { useUpdateAdmin } from '@/queries/Admins/useUpdateAdmin';

const CreateEditViewAdmin: React.FC = () => {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const adminId = id || '';
  const { admin, handleInvalidAdminById } = useGetAdminById({ id: adminId });
  const { handleInvalidateAdminsList } = useGetAdminsList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });
  const { onCreateAdmin } = useCreateNewAdmin({
    onSuccess: () => {
      toast.success({
        message: 'Create admin successfully',
        description: 'You have successfully created a new admin.',
      });
      handleInvalidateAdminsList({
        current: 1,
        pageSize: 10,
      });
      navigate(-1);
    },
    onError: (error: any) => {
      const errorMessage =
        (error as any)?.response?.data?.message || 'An unexpected error occurred.';
      if ((error as any)?.response?.data?.code !== 1000) {
        toast.error({
          message: 'Create admin failed',
          description: errorMessage,
        });
      }
    },
  });
  const { onUpdateAdmin, error: updateError } = useUpdateAdmin({
    onSuccess: () => {
      toast.success({
        message: 'Update Admin successfully',
        description: 'You have successfully updated the Admin.',
      });
      handleInvalidateAdminsList({
        current: 1,
        pageSize: 10,
      });
      handleInvalidAdminById();
      navigate(-1);
    },
    onError: (error: any) => {
      const errorMessage =
        (error as any)?.response?.data?.message || 'An unexpected error occurred.';
      if ((error as any)?.response?.data?.code !== 1000) {
        toast.error({
          message: 'Update Admin failed',
          description: errorMessage,
        });
      }
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AdminPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initAdminValue,
    resolver: zodResolver(adminRegisterFormSchema),
  });

  console.log(errors);
  useEffect(() => {
    console.log(admin);
    if (id) {
      reset({ ...admin, id: Number(adminId) });
    }
  }, [admin, reset]);

  const onSubmit = (data: CRUAdminPayload) => {
    if (!id) {
      onCreateAdmin(data);
    } else {
      onUpdateAdmin({ id: Number(adminId), data });
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
            <Form.Item label="Work schedule">
              <Controller
                name="workSchedule"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter work schedule" />
                    {errors.workSchedule && (
                      <Typography.Text type="danger">{errors.workSchedule.message}</Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Hire date">
              <Controller
                name="hireDate"
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
                    {errors.hireDate && (
                      <Typography.Text type="danger">{errors.hireDate.message}</Typography.Text>
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
            <Form.Item label="Emergency Contact Name">
              <Controller
                name="emergencyContactName"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Enter emergency contact name" />
                    {errors.emergencyContactName && (
                      <Typography.Text type="danger">
                        {errors.emergencyContactName.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
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

export default CreateEditViewAdmin;
